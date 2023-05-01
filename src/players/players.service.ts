import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async getUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    // const playerFound = this.players.find((player) => player.email === email);

    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      this.update(createPlayerDto);
    } else {
      this.create(createPlayerDto);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async consultPlayersByEmail(email: string): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ email }).exec();
    if (!playerFound) {
      throw new NotFoundException(`Player with ${email} not found`);
    }
    return playerFound;
  }

  async deletePlayer(email: string): Promise<any> {
    return await this.playerModel.deleteOne({ email }).exec();
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDto);

    return await playerCreated.save();
  }

  private async update(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDto.email },
        { $set: createPlayerDto },
      )
      .exec();
  }
}
