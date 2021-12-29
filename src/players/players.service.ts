import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { UpdatePlayerDTO } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const { email } = createPlayerDTO;

    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      throw new BadRequestException(`Jogador com email ${email} já cadastrado`);
    }

    const playerCreated = new this.playerModel(createPlayerDTO);

    return await playerCreated.save();
  }

  async updatePlayer(
    _id: string,
    updatePlayerDTO: UpdatePlayerDTO,
  ): Promise<void> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    await this.playerModel
      .findOneAndUpdate({ _id }, { $set: updatePlayerDTO })
      .exec();
  }

  async consultAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async consultPlayerById(_id: string): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();
    if (!playerFound) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    return playerFound;
  }

  async deletePlayer(_id): Promise<any> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    return await this.playerModel.deleteOne({ _id }).exec();
  }
}
