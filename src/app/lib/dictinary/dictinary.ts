export enum AnimeRating {
  ALL_AGES = 'G', // Все возрасты (General Audiences)
  TEENS_AND_UP = 'PG-13', // Подростки и старше (Teens and up)
  RESTRICTED = 'R', // Ограничение (Restricted - 17+)
  MATURE = 'X', // Для взрослых (Mature - 18+)
  UNKNOWN = 'U', // Неизвестно или не указано (Unknown)
}

export const animeRatings = [
  {
    key: 'ALL_AGES',
    value: 'G',
    description:
      'Для всех возрастов. Содержимое подходит для любой зрительской аудитории.',
  },
  {
    key: 'TEENS_AND_UP',
    value: 'PG-13',
    description:
      'Подходит для подростков и старше. Может содержать легкое насилие, незначительные сексуальные темы или мелкие оскорбления.',
  },
  {
    key: 'RESTRICTED',
    value: 'R',
    description:
      'Ограничено. Содержит более явное насилие, кровь, грубый язык или сексуальные темы. Рекомендуется для зрителей 17 лет и старше.',
  },
  {
    key: 'MATURE',
    value: 'X',
    description:
      'Только для взрослых. Содержит графическое насилие, откровенные сцены или темы для взрослой аудитории. Только для лиц 18 лет и старше.',
  },
  {
    key: 'UNKNOWN',
    value: 'U',
    description: 'Неизвестный или неопределенный рейтинг.',
  },
];
