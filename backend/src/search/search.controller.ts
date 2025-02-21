import { BadRequestException, Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { GeniusApiService } from 'src/genius-api/genius-api.service';

@Controller('search')
export class SearchController {
  constructor(private readonly geniusApiService: GeniusApiService) {}

  @Get()
  get(@Query('q') q: string, @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number) {
    if (!q) throw new BadRequestException();
    return this.geniusApiService.searchSong(q, page);
  }
}
