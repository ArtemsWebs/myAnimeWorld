'use client';
import { LayoutBackgroundWrapperProps } from '@/app/ui/LoyuatBackgroundWrapper/LayoutBackgroundWrapper.types';
import { MouseEvent, MutableRefObject, useMemo, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/app/ui/Navbar/Navbar';
import Show from '@/app/ui/Show/Show';
import { UserIcon } from '@/app/home/animes/component/UserIcon';
import { useCheckAccess } from '@/app/lib/utils/useCheckAccess';

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
  { key: 'home', value: 'Домой', route: '/home' },
  { key: 'anime', value: 'Аниме', route: '/home' },
  { key: 'manga', value: 'Манга', route: '/home' },
  { key: 'favorite', value: 'Мой список', route: '/home' },
];

const LayoutBackgroundWrapper = ({
  mode,
  children,
}: LayoutBackgroundWrapperProps) => {
  const isAuth = mode === 'auth';
  const bg = isAuth ? 'bg-[url(/image/yanderes.avif)]' : 'bg-["#323232"]';

  const { checkPermission } = useCheckAccess();

  const menuItemsWithPermission = useMemo(() => {
    const menuItems = [{ key: 'home', value: 'Домой', route: '/home' }];
    if (checkPermission('USER.READ_ANIME')) {
      menuItems.push({ key: 'anime', value: 'Аниме', route: '/home' });
    }
    if (checkPermission('USER.READ_MANGA')) {
      menuItems.push({ key: 'manga', value: 'Манга', route: '/home' });
    }
    if (checkPermission('USER.CREATE_USER')) {
      menuItems.push({
        key: 'dashboard',
        value: 'Дашборд',
        route: '/home/dashboard',
      });
    }
    return menuItems;
  }, [checkPermission]);

  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={mainContainerRef}
      onMouseMove={(event) => {
        if (isAuth) mouseMoveEffect(event, mainContainerRef);
      }}
      className={
        isAuth
          ? `relative animated w-full bg-[url(/image/yanderes.avif)] bg-cover bg-repeat-round h-[100vh]`
          : `relative animated h-full w-full bg-[#323232] bg-cover bg-repeat-round origin-`
      }
    >
      <div
        className={`relative flex bg-[${isAuth ? '#0e030b' : 'inherit'}] z-20 items-center justify-between pr-[50px]`}
      >
        <div className={`flex`}>
          <Image
            src="/image/logo.svg"
            width={200}
            height={200}
            alt="Logo missing"
          />
          <Show when={!isAuth}>
            <Navbar menuItems={menuItemsWithPermission} />
          </Show>
        </div>
        {!isAuth && <UserIcon />}
      </div>
      <div className={`w-full  ${!isAuth && 'bg-gray-600'}`}>{children}</div>
    </div>
  );
};

export default LayoutBackgroundWrapper;
