import { Module } from '@nestjs/common';
import { GeniusApiModule } from './genius-api/genius-api.module';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search.module';
import { SongsModule } from './songs/songs.module';
import { TranslateModule } from './translate/translate.module';

@Module({
  imports: [ConfigModule.forRoot(), GeniusApiModule, SearchModule, SongsModule, TranslateModule],
})
export class AppModule {}
