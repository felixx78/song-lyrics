import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { GeniusApiService } from 'src/genius-api/genius-api.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly geniusApiService: GeniusApiService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      return await this.geniusApiService.getSongById(id);
    } catch (_) {
      throw new NotFoundException();
    }
  }
}
