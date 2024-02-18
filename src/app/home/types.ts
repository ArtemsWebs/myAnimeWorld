export type ImagesFormat = {
  image_url?: string;
  medium_image_url?: string;
  small_image_url?: string;
  large_image_url?: string;
};

export type Images = {
  jpg?: ImagesFormat;
  webp?: ImagesFormat;
};

export type Trailer = {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: ImagesFormat;
};
export type Title = {
  type: string;
  title: string;
};
export type DayInNumber = {
  day: number;
  month: number;
  year: number;
};

export type Aired = {
  from: Date;
  to: Date;
  prop: {
    from: DayInNumber;
    to: DayInNumber;
  };
};

export type Broadcast = {
  day: string;
  time: string;
  timezone: string;
  string: string;
};

export type Genre = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

interface Producer extends Genre {}

interface Studio extends Genre {}

interface Licensor extends Genre {}

export type AnimeT = {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title?: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms: any[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired?: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  genres: Genre[];
};

type Promo = {
  title: string;
  trailer: Trailer;
};
type Episode = {
  mal_id: 0;
  url: string;
  title: string;
  episode: string;
  images: Images;
};

type Video = {
  promo: Promo[];
  episodes: Episode[];
};

export interface AnimeFull extends AnimeT {
  currentAnime: AnimeT & {
    producers: Producer[];
    studios: Studio[];
    licensors: Licensor[];
  };
  currentVideos: Video;
}

export type AnimeRequestParams = {
  page?: number;
  limit?: number;
  type?:
    | 'tv'
    | 'movie'
    | 'ova'
    | 'special'
    | 'ona'
    | 'music'
    | 'cm'
    | 'pv'
    | 'tv_special';
  status?: 'airing' | 'complete' | 'upcoming';
  order_by:
    | 'mal_id'
    | 'title'
    | 'start_date'
    | 'end_date'
    | 'episodes'
    | 'score'
    | 'scored_by'
    | 'rank'
    | 'popularity'
    | 'members'
    | 'favorites';
};
