import { Elysia, t } from 'elysia';

// {"jpg": {"image_url": "https://cdn.myanimelist.net/images/anime/1876/141251.jpg", "large_image_url": "https://cdn.myanimelist.net/images/anime/1876/141251l.jpg", "small_image_url": "https://cdn.myanimelist.net/images/anime/1876/141251t.jpg"}, "webp": {"image_url": "https://cdn.myanimelist.net/images/anime/1876/141251.webp", "large_image_url": "https://cdn.myanimelist.net/images/anime/1876/141251l.webp", "small_image_url": "https://cdn.myanimelist.net/images/anime/1876/141251t.webp"}}

export const LicensorModel = t.Object({
  id: t.Numeric(),
  malId: t.Numeric(),
  type: t.MaybeEmpty(t.String()),
  name: t.String(),
  url: t.String(),
  animesId: t.MaybeEmpty(t.Number()),
  licensorsAnimeId: t.MaybeEmpty(t.String()),
});

export const GenresModel = t.Object({
  id: t.Numeric(),
  malId: t.Numeric(),
  type: t.MaybeEmpty(t.String()),
  name: t.String(),
  url: t.String(),
});

export const ProducerModel = t.Object({
  id: t.Numeric(),
  malId: t.Numeric(),
  type: t.MaybeEmpty(t.String()),
  name: t.String(),
  animesId: t.MaybeEmpty(t.Number()),
  url: t.String(),
});

export const StudioModel = t.Object({
  id: t.Numeric(),
  malId: t.Numeric(),
  type: t.String(),
  name: t.String(),
  url: t.String(),
});

export const InternalLinkImageModel = t.Object({
  image_url: t.String(),
  large_image_url: t.String(),
  small_image_url: t.String(),
});

export const InternalTrailerImagesModel = t.Object({
  image_url: t.MaybeEmpty(t.String()),
  large_image_url: t.MaybeEmpty(t.String()),
  small_image_url: t.MaybeEmpty(t.String()),
  medium_image_url: t.MaybeEmpty(t.String()),
  maximum_image_url: t.MaybeEmpty(t.String()),
});

export const AnimeModelBase = t.Object({
  id: t.Numeric(),
  malId: t.Numeric(),
  title: t.String(),
  url: t.Nullable(t.String()),
  titleEnglish: t.Nullable(t.String()),
  titleJapanese: t.Nullable(t.String()),
  source: t.Nullable(t.String()),
  episodes: t.Nullable(t.Numeric()),
  trailer: t.Partial(
    t.Object({
      url: t.Nullable(t.String()),
      images: t.Partial(InternalTrailerImagesModel),
      embed_url: t.MaybeEmpty(t.String()),
    }),
  ),
  status: t.Nullable(t.String()),
  airing: t.Nullable(t.Boolean()),
  rating: t.Nullable(t.String()),
  score: t.Nullable(t.Numeric()),
  scoredBy: t.Nullable(t.Numeric()),
  rank: t.Nullable(t.Numeric()),
  popularity: t.Nullable(t.Numeric()),
  members: t.Nullable(t.Numeric()),
  favorites: t.Nullable(t.Numeric()),
  synopsis: t.Nullable(t.String()),
  background: t.MaybeEmpty(t.String()),
  season: t.Nullable(t.String()),
  type: t.Nullable(t.String()),
  images: t.Object({
    jpg: t.Optional(InternalLinkImageModel),
    webp: t.Optional(InternalLinkImageModel),
  }),
  videoUrl: t.Nullable(t.String()),
  thumbnaiUrl: t.Nullable(t.String()),
  duration: t.Nullable(t.String()),
});

const AnimeModelSuccessResponse = t.Object({
  id: t.Numeric(),
  name: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  description: t.Nullable(t.String()),
  isDefaultUser: t.Boolean(),
  permission: t.Array(
    t.Object({
      id: t.Numeric(),
      description: t.String(),
      name: t.String(),
    }),
  ),
});

const AnimeAllModelResponse = t.Array(AnimeModelBase);

export type AnimeModelResponse = (typeof AnimeModelBase)['static'];

export const AnimeModelDTO = new Elysia().model({
  'anime.model': AnimeModelBase,
  'animeAll.model.response': AnimeAllModelResponse,
});
