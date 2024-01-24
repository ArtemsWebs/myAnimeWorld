'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MouseEvent, useCallback, useRef } from 'react';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
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
    <html lang="en">
      <body className={inter.className}>
        <div
          ref={mainContainerRef}
          onMouseMove={(event) => mouseMoveEffect(event)}
          className={`relative animated h-full w-full bg-[url('/yanderes.jpg')] bg-cover bg-repeat-round origin-`}
        >
          <Image src="/logo.svg" width={200} height={200} alt="Logo missing" />
          {children}
        </div>
      </body>
    </html>
  );
}
