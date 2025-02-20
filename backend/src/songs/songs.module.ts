import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { GeniusApiModule } from 'src/genius-api/genius-api.module';
import { SongsService } from './songs.service';
import { TranslateModule } from 'src/translate/translate.module';

@Module({
  imports: [GeniusApiModule, TranslateModule],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
