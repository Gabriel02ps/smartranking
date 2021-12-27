import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    const playerFound = this.players.find((player) => player.email === email);

    if (playerFound) {
      this.update(playerFound, createPlayerDTO);
    } else {
      this.create(createPlayerDTO);
    }
  }

  async consultAllPlayers(): Promise<Player[]> {
    return await this.players;
  }

  async consultPlayerByEmail(email: string): Promise<Player> {
    const playerFound = this.players.find((player) => player.email === email);
    if (!playerFound) {
      throw new NotFoundException(`Jogador com ${email} não encontrado`);
    }
    return playerFound;
  }

  async deletePlayer(email): Promise<void> {
    const playerFound = this.players.find((player) => player.email === email);
    this.players = this.players.filter(
      (player) => player.email !== playerFound.email,
    );
  }

  private create(createPlayerDTO: CreatePlayerDTO): void {
    const { name, phoneNumber, email } = createPlayerDTO;

    const player: Player = {
      _id: uuidv4(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      rankingPosition: 1,
      playerPhoto: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log(`createPlayerDTO: ${JSON.stringify(player)}`);

    this.players.push(player);
  }

  private update(playerFound: Player, createPlayerDTO: CreatePlayerDTO): void {
    const { name } = createPlayerDTO;

    playerFound.name = name;
  }
}
