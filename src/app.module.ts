import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:bpxxHf4bUFuyA9O2@cluster0.mns2m.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIbdex: true,
        // useFindAndModify: false,
      },
    ),
    PlayersModule,
  ],
})
export class AppModule {}
