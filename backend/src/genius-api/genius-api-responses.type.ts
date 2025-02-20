import Song from 'src/types/Song.type';

export type GeniusResponse<T> = {
  response: T;
};

export type GeniusApiSearchResponse = GeniusResponse<{
  hits: Array<{ result: Song }>;
}>;

export type GeniusApiSongByIdResponse = GeniusResponse<{ song: Song }>;
