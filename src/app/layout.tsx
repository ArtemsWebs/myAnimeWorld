'use client';

import './globals.css';
import '@vidstack/react/player/styles/base.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import {
  Navigation,
  Pagination,
  EffectFade,
  Mousewheel,
  Keyboard,
} from 'swiper/modules';

//@NOTE https://stackoverflow.com/questions/50009818/javascript-swiper-native-navigation-function-is-not-working
import SwiperCore from 'swiper';
import { inter } from '@/app/ui/font';
import { ModalProvider } from '@/app/ui/Modal/ModalProvider';
SwiperCore.use([Navigation, Pagination, EffectFade, Mousewheel, Keyboard]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
