import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  GeniusApiSearchResponse,
  GeniusApiSongByIdResponse,
} from './types/genius-api-search-response.type';

@Injectable()
export class GeniusApiService {
  private readonly BASE_URL = 'https://api.genius.com';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.configService.get('GENIUS_SECRET')}`,
    };
  }

  async searchSong(q: string, page: number = 0) {
    const response = await firstValueFrom(
      this.httpService.get<GeniusApiSearchResponse>(this.BASE_URL + '/search', {
        headers: this.getHeaders(),
        params: { q, page },
      }),
    );

    return response.data.response.hits.map((i) => i.result);
  }

  async getSongById(id: string) {
    const response = await firstValueFrom(
      this.httpService.get<GeniusApiSongByIdResponse>(
        this.BASE_URL + `/songs/${id}`,
        {
          headers: this.getHeaders(),
        },
      ),
    );

    return response.data.response.song;
  }
}
