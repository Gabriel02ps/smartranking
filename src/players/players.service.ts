import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      this.update(createPlayerDTO);
    } else {
      this.create(createPlayerDTO);
    }
  }

  async consultAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async consultPlayerByEmail(email: string): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ email }).exec();
    if (!playerFound) {
      throw new NotFoundException(`Jogador com ${email} não encontrado`);
    }
    return playerFound;
  }

  async deletePlayer(email): Promise<any> {
    return await this.playerModel.remove({ email }).exec();
  }

  private async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDTO);

    return await playerCreated.save();
  }

  private async update(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDTO.email },
        { $set: createPlayerDTO },
      )
      .exec();
  }
}
