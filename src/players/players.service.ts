import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);

  async getUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const playerFound = this.players.find((player) => player.email === email);

    if (playerFound) {
      this.update(playerFound, createPlayerDto);
    } else {
      this.create(createPlayerDto);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.players;
  }

  async consultPlayersByEmail(email: string): Promise<Player> {
    const playerFound = this.players.find((player) => player.email === email);
    if (!playerFound) {
      throw new NotFoundException(`Player with ${email} not found`);
    }
    return playerFound;
  }

  async deletePlayer(email: string): Promise<void> {
    const playerFound = this.players.find((player) => player.email === email);
    this.players = this.players.filter(
      (player) => player.email !== playerFound.email,
    );
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { name, phoneNumber, email } = createPlayerDto;

    const player: Player = {
      _id: uuidv4(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      positionRanking: 1,
      urlProfilePicture:
        'https://avatars.githubusercontent.com/u/61991172?s=400&u=83130f85d0af1735f7d589145003ea05fa058b78&v=4',
    };
    this.logger.log(`create playerDto: ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  private update(playerFound: Player, createPlayerDto: CreatePlayerDto): void {
    const { name } = createPlayerDto;

    playerFound.name = name;
  }
}
