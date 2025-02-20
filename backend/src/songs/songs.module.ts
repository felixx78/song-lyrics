import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { GeniusApiModule } from 'src/genius-api/genius-api.module';

@Module({
  imports: [GeniusApiModule],
  controllers: [SongsController],
})
export class SongsModule {}
