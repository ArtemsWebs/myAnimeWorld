import { HTMLAttributes, useMemo, useState } from 'react';
import classNames from 'classnames';
import VideoJS from '@/app/ui/Player/Player';
import CustomSelect from '@/app/ui/Select/Select';
import { AnimeModelResponse } from '@/server/src/anime/model/anime.model';
import { BaseOption } from '@/app/home/animes/types';

interface AnimePlayer extends HTMLAttributes<HTMLDivElement> {
  animeFullInfo: AnimeModelResponse;
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
      `/videos/anime/Ore_dake_Level_Up_na_Ken/Ore_dake_Level_Up_na_Ken_[${selectedEpisode?.value ?? 1}].mp4`,
    [formatedTitleName, selectedEpisode],
  );

  return (
    <div className={classNames(className, 'flex-col col-auto w-[1280px]')}>
      <VideoJS
        className={classNames(playerClassname, 'w-full')}
        options={{
          sources: [
            {
              src: animeLink,
              type: 'video/mp4',
            },
          ],
        }}
      />
      <div className={'flex justify-center gap-10 pt-4 w-full'}>
        <CustomSelect
          value={selectedDubber}
          onChange={setSelectedDubber}
          options={dubberDefaultOptions}
        />
        <CustomSelect
          value={selectedEpisode}
          onChange={setSelectedEpisode}
          options={episodeDefaultOptions}
        />
      </div>
    </div>
  );
};

export default AnimePlayer;
