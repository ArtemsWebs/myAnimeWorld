'use client';
import { LayoutBackgroundWrapperProps } from '@/app/_widget/LoyuatBackgroundWrapper/LayoutBackgroundWrapper.types';
import { MouseEvent, MutableRefObject, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/app/_widget/Navbar/Navbar';
import Show from '@/app/_widget/Show/Show';

const mouseMoveEffect = (
  e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ref: MutableRefObject<HTMLDivElement | null>,
) => {
  if (!ref.current) return;
  let moveX = (e.pageX * -1) / 60;
  let moveY = (e.pageY * -1) / 60;
  ref.current.style.backgroundPosition = `${moveX}px ${moveY}px`;
};

const menuItems = [
  { key: 'home', value: 'Домой' },
  { key: 'anime', value: 'Аниме' },
  { key: 'manga', value: 'Манга' },
  { key: 'favorite', value: 'Мой список' },
];

const LayoutBackgroundWrapper = ({
  mode,
  children,
}: LayoutBackgroundWrapperProps) => {
  const isAuth = mode === 'auth';

  const bg = isAuth ? 'bg-[url(/image/yanderes.jpg)]' : 'bg-["#323232"]';

  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={mainContainerRef}
      onMouseMove={(event) => {
        if (isAuth) mouseMoveEffect(event, mainContainerRef);
      }}
      className={
        isAuth
          ? `relative animated h-full w-full bg-[url(/image/yanderes.jpg)] bg-cover bg-repeat-round`
          : `relative animated h-full w-full bg-[#323232] bg-cover bg-repeat-round origin-`
      }
    >
      <div
        className={`relative flex bg-[${isAuth ? '#0e030b' : 'inherit'}] z-20`}
      >
        <Image
          src="/image/logo.svg"
          width={200}
          height={200}
          alt="Logo missing"
        />
        <Show when={!isAuth}>
          <Navbar menuItems={menuItems} />
        </Show>
      </div>
      <div className={`w-full  ${!isAuth && 'bg-gray-600'}`}>{children}</div>
      <div className={'w-full min-h-[100px] bg-gray-600'}></div>
    </div>
  );
};

export default LayoutBackgroundWrapper;
