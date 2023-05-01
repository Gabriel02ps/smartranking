import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async getUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playersService.getUpdatePlayer(createPlayerDto);
  }

  @Get()
  async getPlayers(
    @Query('email') email: string,
  ): Promise<Player | Player[] | Player[]> {
    if (email) {
      return await this.playersService.consultPlayersByEmail(email);
    } else {
      return await this.playersService.getAllPlayers();
    }
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    this.playersService.deletePlayer(email);
  }
}
