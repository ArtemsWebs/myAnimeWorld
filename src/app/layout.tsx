'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

//@NOTE https://stackoverflow.com/questions/50009818/javascript-swiper-native-navigation-function-is-not-working
import SwiperCore from 'swiper';
SwiperCore.use([Navigation, Pagination, EffectFade]);

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
