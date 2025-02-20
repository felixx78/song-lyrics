import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { GeniusApiModule } from 'src/genius-api/genius-api.module';

@Module({
  imports: [GeniusApiModule],
  controllers: [SearchController],
})
export class SearchModule {}
