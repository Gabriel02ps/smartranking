import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  @Post()
  async createUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    const { email } = createPlayerDTO;
    return JSON.stringify(`{
      "email": ${email},
    }`);
  }
}
