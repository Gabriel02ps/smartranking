import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:x3xYXQJYift9jzJk@cluster0.mns2m.mongodb.net/smartranking?authMechanism=SCRAM-SHA-1',
    ),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
