import { BadRequestException, Controller, Get, InternalServerErrorException, NotFoundException, Param, Query } from '@nestjs/common';
import { GeniusApiService } from 'src/genius-api/genius-api.service';
import { SongsService } from './songs.service';
import { TranslateService } from 'src/translate/translate.service';

@Controller('songs')
export class SongsController {
  constructor(
    private readonly geniusApiService: GeniusApiService,
    private readonly songsService: SongsService,
    private readonly translateService: TranslateService,
  ) {}

  @Get('lyrics')
  async getTranslatedSong(@Query('url') url: string, @Query('lang') lang: string) {
    if (!url) throw new BadRequestException();

    try {
      const original = await this.songsService.getLyrics(url);
      const translated = await this.translateService.translate(original, 'auto', lang || 'en');

      return { original, translated };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      return await this.geniusApiService.getSongById(id);
    } catch (_) {
      throw new NotFoundException();
    }
  }
}
