import { HTMLAttributes, useMemo, useState } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import VideoJS from '@/app/_widget/Player/Player';
import { AnimeFull, BaseOption } from '@/app/home/types';

interface AnimePlayer extends HTMLAttributes<HTMLDivElement> {
  animeFullInfo: AnimeFull['currentAnime'];
  playerClassname?: string;
  options?: any;
  onReady?: any;
}

//@TODO наверное стоит получать эти параметры с бэка
const dubberDefaultOptions: BaseOption[] = [
  {
    value: 'animeVost',
    label: 'animeVost',
  },
  {
    value: 'AniLibria_TV',
    label: 'AniLibria_TV',
  },
];

const episodeDefaultOptions: BaseOption[] = [
  {
    value: '1',
    label: 'Эпизод 1',
  },
  {
    value: '2',
    label: 'Эпизод 2',
  },
];

export const AnimePlayer = ({
  animeFullInfo,
  onReady,
  playerClassname,
  className,
}: AnimePlayer) => {
  const [selectedDubber, setSelectedDubber] = useState<BaseOption | null>(
    dubberDefaultOptions[0],
  );

  const [selectedEpisode, setSelectedEpisode] = useState<BaseOption | null>(
    episodeDefaultOptions[0],
  );

  const formatedTitleName = useMemo(
    () => animeFullInfo?.title?.replaceAll(' ', '_'),
    [animeFullInfo],
  );

  const animeLink = useMemo(
    () =>
      `/videos/anime/${formatedTitleName}/${formatedTitleName}_[${selectedEpisode?.value ?? 1}].mp4`,
    [formatedTitleName, selectedEpisode],
  );

  return (
    <div className={classNames(className, 'items-center flex-col col-auto')}>
      <VideoJS
        className={playerClassname}
        options={{
          sources: [
            {
              src: animeLink,
              type: 'video/mp4',
            },
          ],
        }}
      />
      <div className={'flex justify-center gap-10 pt-10'}>
        <Select
          value={selectedDubber}
          onChange={setSelectedDubber}
          options={dubberDefaultOptions}
        />
        <Select
          value={selectedEpisode}
          onChange={setSelectedEpisode}
          options={episodeDefaultOptions}
        />
      </div>
    </div>
  );
};

export default AnimePlayer;
