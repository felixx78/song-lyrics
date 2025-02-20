import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeniusApiModule } from './genius-api/genius-api.module';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [ConfigModule.forRoot(), GeniusApiModule, SearchModule, SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
