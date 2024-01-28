'use client';
import { LayoutBackgroundWrapperProps } from '@/app/_widget/LoyuatBackgroundWrapper/LayoutBackgroundWrapper.types';
import { MouseEvent, MutableRefObject, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/app/_widget/Navbar/Navbar';

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

  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={mainContainerRef}
      onMouseMove={(event) => {
        if (isAuth) mouseMoveEffect(event, mainContainerRef);
      }}
      className={`relative animated h-full w-full bg-[url('/yanderes.jpg')] bg-cover bg-repeat-round origin-`}
    >
      <div className="flex bg-[#0e030b]">
        <Image src="/logo.svg" width={200} height={200} alt="Logo missing" />
        <Navbar menuItems={menuItems} />
      </div>
      {children}
    </div>
  );
};

export default LayoutBackgroundWrapper;
