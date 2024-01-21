'use client';

import Image from 'next/image';
import { MouseEvent, useCallback, useRef, useState } from 'react';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mouseMoveEffect = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      if (!mainContainerRef.current) return;
      let moveX = (e.pageX * -1) / 60;
      let moveY = (e.pageY * -1) / 60;
      mainContainerRef.current.style.backgroundPosition = `${moveX}px ${moveY}px`;
    },
    [],
  );
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={mainContainerRef}
      onMouseMove={(event) => mouseMoveEffect(event)}
      className={`relative animated h-full w-full bg-[url('/yanderes.jpg')] bg-cover bg-repeat-round origin-bottom `}
    >
      <Image src="/logo.svg" width={200} height={200} alt="Logo missing" />
      {children}
    </div>
  );
}
