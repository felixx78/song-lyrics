import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';
import { GeniusApiService } from './genius-api/genius-api.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly geniusService: GeniusApiService,
  ) {}

  @Get()
  async getHello() {
    try {
      return JSON.stringify(await this.geniusService.getSongById('3249022'));
    } catch (_) {
      throw new InternalServerErrorException();
    }
  }
}
