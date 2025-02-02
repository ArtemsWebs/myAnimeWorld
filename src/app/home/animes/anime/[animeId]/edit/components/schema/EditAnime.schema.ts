import { z } from 'zod';
// {
//   "blocks": [
//   {
//     "key": "abhb1",
//     "text": "Аниме \"Император дао\" - это захватывающий фэнтезийный боевик, который не оставит равнодушным ни одного зрителя. Качественная анимация и проработанный сюжет погрузят вас в мир китайской мифологии, где боги и люди сражаются за власть и свою судьбу.",
//     "type": "unstyled",
//     "depth": 0,
//     "inlineStyleRanges": [
//       {
//         "offset": 0,
//         "length": 246,
//         "style": "color-rgb(0,0,0)"
//       },
//       {
//         "offset": 0,
//         "length": 246,
//         "style": "fontsize-14"
//       },
//       {
//         "offset": 0,
//         "length": 246,
//         "style": "fontfamily-Roboto, sans-serif"
//       }
//     ],
//     "entityRanges": [],
//     "data": {
//       "text-align": "start"
//     }
//   },
//   {
//     "key": "fthq3",
//     "text": "Особое внимание стоит обратить на персонажей аниме. Главный герой Цинь Ян - это не просто молодой и талантливый парень, но и сильный и харизматичный лидер, который готов пойти на все, чтобы защитить своих близких. Его друзья и союзники также являются яркими и запоминающимися персонажами, каждый из которых имеет свою уникальную силу и характер.",
//     "type": "unstyled",
//     "depth": 0,
//     "inlineStyleRanges": [
//       {
//         "offset": 0,
//         "length": 345,
//         "style": "color-rgb(0,0,0)"
//       },
//       {
//         "offset": 0,
//         "length": 345,
//         "style": "fontsize-14"
//       },
//       {
//         "offset": 0,
//         "length": 345,
//         "style": "fontfamily-Roboto, sans-serif"
//       }
//     ],
//     "entityRanges": [],
//     "data": {
//       "text-align": "start"
//     }
//   },
//   {
//     "key": "ekceq",
//     "text": "Но главной изюминкой аниме является его художественный стиль. Красочные и детально проработанные боевые сцены, эффекты магии и красивые пейзажи создают неповторимую атмосферу и погружают зрителя в мир Императора дао. Каждый кадр можно рассматривать как настоящее произведение искусства.",
//     "type": "unstyled",
//     "depth": 0,
//     "inlineStyleRanges": [
//       {
//         "offset": 0,
//         "length": 286,
//         "style": "color-rgb(0,0,0)"
//       },
//       {
//         "offset": 0,
//         "length": 286,
//         "style": "fontsize-14"
//       },
//       {
//         "offset": 0,
//         "length": 286,
//         "style": "fontfamily-Roboto, sans-serif"
//       }
//     ],
//     "entityRanges": [],
//     "data": {
//       "text-align": "start"
//     }
//   },
//   {
//     "key": "b8237",
//     "text": "Смотреть аниме \"Император дао\" онлайн бесплатно на русском языке - это отличная возможность окунуться в захватывающий мир фэнтези и насладиться качественной анимацией. Сюжет аниме будет держать вас в напряжении до самого конца, а неожиданные повороты событий не дадут вам заскучать.",
//     "type": "unstyled",
//     "depth": 0,
//     "inlineStyleRanges": [
//       {
//         "offset": 0,
//         "length": 282,
//         "style": "color-rgb(0,0,0)"
//       },
//       {
//         "offset": 0,
//         "length": 282,
//         "style": "fontsize-14"
//       },
//       {
//         "offset": 0,
//         "length": 282,
//         "style": "fontfamily-Roboto, sans-serif"
//       }
//     ],
//     "entityRanges": [],
//     "data": {
//       "text-align": "start"
//     }
//   },
//   {
//     "key": "6p44o",
//     "text": "В заключение, аниме \"Император дао\" - это прекрасный выбор для любителей фэнтези и боевиков. Оно сочетает в себе интересный сюжет, харизматичных персонажей и красивую анимацию, которая не оставит вас равнодушными. Не упустите возможность посмотреть это аниме онлайн бесплатно на русском языке и погрузиться в захватывающий мир Императора дао! ",
//     "type": "unstyled",
//     "depth": 0,
//     "inlineStyleRanges": [
//       {
//         "offset": 0,
//         "length": 342,
//         "style": "color-rgb(0,0,0)"
//       },
//       {
//         "offset": 0,
//         "length": 342,
//         "style": "fontsize-14"
//       },
//       {
//         "offset": 0,
//         "length": 342,
//         "style": "fontfamily-Roboto, sans-serif"
//       }
//     ],
//     "entityRanges": [],
//     "data": {
//       "text-align": "start"
//     }
//   }
// ],
//   "entityMap": {}
// }
export const EditAnimeSchema = z.object({
  name: z
    .string({
      required_error: 'Поле "Название аниме" должно быть обязательно заполнено',
      invalid_type_error: 'Поле "имя" не может содержать численные значения',
    })
    .min(5, 'Поля "имя" должно содержать более 5 символов'),
  description: z.object({
    blocks: z.array(
      z.object({
        data: z.object({}),
        key: z.string(),
        text: z.string(),
        type: z.string(),
        depth: z.number(),
        inlineStyleRanges: z.array(
          z.object({
            offset: z.number(),
            length: z.number(),
            style: z.string(),
          }),
        ),
      }),
    ),
    entityMap: z.object({}),
  }),
  episodes: z.number().optional(),
  duration: z.number().optional(),
  raiting: z.object({
    key: z.string(),
    value: z.string(),
    description: z.string(),
  }),
  dateStart: z.string(),
  dateEnd: z.string(),
  genres: z.array(
    z.object({
      value: z.number(),
      label: z.string(),
    }),
  ),
  studios: z.array(
    z.object({
      name: z.string(),
      url: z.string().optional(),
      id: z.number(),
      animeIds: z.array(z.string()).optional(),
      malId: z.number(),
    }),
  ),
  producers: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().optional(),
        id: z.number(),
        animeIds: z.array(z.string()).optional(),
        malId: z.number(),
      }),
    )
    .optional(),
  dubbers: z
    .array(
      z.object({
        id: z.number(),
        descriptions: z.string(),
        persons: z.string(),
        logoUrl: z.string(),
      }),
    )
    .optional(),
  licensors: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().optional(),
        id: z.number(),
        licensorAnimeIds: z.array(z.string()).optional(),
        animeIds: z.array(z.string()).optional(),
        malId: z.number(),
      }),
    )
    .optional(),
});

export type EditAnimeSchemaType = z.infer<typeof EditAnimeSchema>;
