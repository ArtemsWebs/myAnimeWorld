import {
  HTMLAttributes,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player';
import classNames from 'classnames';
import Select from 'react-select/base';

interface VideoJsProps extends HTMLAttributes<HTMLDivElement> {
  options?: any;
  onReady?: any;
}

const defaultVideoOptions = {
  controls: true,
  controlBar: {
    skipButtons: {
      backward: 10,
      forward: 10,
    },
  },
  userActions: {
    hotkeys: function (event) {
      const playerContext = this as any;
      // `this` is the player in this context
      // `space` key = pause or start check video status
      if (event.which === 32) {
        if (!playerContext.paused()) playerContext.pause();
        else playerContext.play();
      }
      // `right arrow` key = forward video for some second
      if (event.which === 39) {
        playerContext.currentTime(playerContext.currentTime() + 10);
      }
      // `left arrow` key = backward video for some second
      if (event.which === 37) {
        playerContext.currentTime(playerContext.currentTime() - 10);
      }
    },
  },
};

//@TODO наверное стоит получать эти параметры с бэка
const dubberDefaultOptions = [
  {
    value: 'animeVost',
    label: 'animeVost',
  },
  {
    value: 'AniLibria_TV',
    label: 'AniLibria_TV',
  },
];

const episodeDefaultOptions = [
  {
    value: '1',
    label: 'Эпизод 1',
  },
  {
    value: '2',
    label: 'Эпизод 2',
  },
];

export const VideoJS = ({ options, onReady, className }: VideoJsProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  const [selectedDubber, setSelectedDubber] = useState(dubberDefaultOptions[0]);

  const actualVideoOptions = useMemo(
    () => ({ ...defaultVideoOptions, ...options }),
    [],
  );

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef?.current?.appendChild?.(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        actualVideoOptions,
        () => {
          videojs.log('player is ready');
          onReady && onReady(player);
        },
      ));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(actualVideoOptions.autoplay);
      player.src(actualVideoOptions.sources);
    }
  }, [actualVideoOptions, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className={classNames(className, 'rounded-md')} data-vjs-player>
      <div ref={videoRef} className={'rounded-lg'} />
      <div className={'flex justify-between'}>
        <Select
          defaultValue={selectedDubber}
          onChange={(value) => setSelectedDubber(value)}
          options={dubberDefaultOptions}
        />
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
    </div>
  );
};

export default VideoJS;
