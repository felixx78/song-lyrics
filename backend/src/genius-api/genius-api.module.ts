import { Module } from '@nestjs/common';
import { GeniusApiService } from './genius-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GeniusApiService],
  exports: [GeniusApiService],
})
export class GeniusApiModule {}
