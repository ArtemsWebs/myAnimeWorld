'use client';
import Typography from '@/app/ui/Typography';
import { Divider, InfoRow, ToggleButtons } from '@/app/ui';
import useSWR from 'swr';
import { getSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToggleButtonOption } from '@/app/ui/ToggleButtons/type';
import { LuBoxes } from 'react-icons/lu';
import { HiMiniUsers } from 'react-icons/hi2';
import { FcStatistics } from 'react-icons/fc';
import SettingBlocks from '@/app/home/settings/profile/_components/SettingBlock';
import Link from 'next/link';

const toggleOptions: ToggleButtonOption[] = [
  { label: 'Общие', icon: <LuBoxes />, onClick: () => {} },
  { label: 'Друзья', icon: <HiMiniUsers />, onClick: () => {} },
  { label: 'Статистика', icon: <FcStatistics />, onClick: () => {} },
];

export default function SettingsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { data: session } = useSWR(
    '_session',
    async (_key) => await getSession(),
  );
  return (
    <div className="w-full relative">
      <div className="w-full bg-teal-400 rounded-lg p-4 h-[160px]">
        <div className="my-[24px] mx-[24px] flex ">
          <div className="absolute bg-white backdrop-blur-lg bg-white/30 w-[95%] h-[120px] top-[100px] rounded-lg  flex items-center p-4 justify-between">
            <div className="flex gap-4">
              <img
                src={session?.user?.image || ''}
                alt={''}
                className="w-[80px] h-[80px] rounded-xl"
              />
              <div className="flex flex-col gap-1 justify-center">
                <Typography variant="subtitle" component="p">
                  {session?.user?.name}
                </Typography>
                <Typography variant="regular" component="p">
                  {session?.user?.email}
                </Typography>
              </div>
            </div>
            <ToggleButtons options={toggleOptions} />
          </div>
          {/*<Divider orientation="vertical" />*/}
        </div>
      </div>
      <div className="relative mt-[80px]">
        <div className={'grid grid-cols-3 gap-4 mb-4'}>
          <Link href={'/home/settings/profile/socialMedia'}>
            <SettingBlocks
              title="Настройки доступов"
              hrefToLink={'/home/settings/profile/socialMedia'}
              titleClassName={'mb-2'}
            >
              <Typography variant="subtitle" component="p">
                Уведомления и звуки
              </Typography>
              <div>Уведомления на рабочий стол</div>
              <div>Уведомления в личных чатах</div>
              <Typography variant="subtitle" component="p">
                Конфиденциальность:
              </Typography>
              <InfoRow
                title={'Номер телефона'}
                titleClassName="text-gray-500"
                value={'Разрешен'}
                className="mt-2 text-gray-400"
              />
              <InfoRow
                title={'Время захода'}
                titleClassName="text-gray-500"
                value={'Разрешен'}
                className="mt-2 text-gray-400"
              />
              <InfoRow
                title={'Дата рождения'}
                titleClassName="text-gray-500"
                value={'Разрешен'}
                className="mt-2 text-gray-400"
              />
              <InfoRow
                title={'ссылки на соц сети'}
                titleClassName="text-gray-500"
                value={'Разрешен'}
                className="mt-2 text-gray-400"
              />
            </SettingBlocks>
          </Link>
          <Link href={'/home/settings/profile/socialMedia'}>
            <SettingBlocks
              hrefToLink={'/home/settings/profile/socialMedia'}
              title="Доступ приложения к личной информации"
              titleClassName={'mb-2'}
            >
              <InfoRow
                title={'Телеграмм'}
                titleClassName="text-gray-500"
                value={'Разрешен'}
                className="mt-2 text-gray-400"
              />
              <InfoRow
                title={'Shikimori'}
                titleClassName="text-gray-500"
                value={'Разрешен'}
                className="mt-2 text-gray-400"
              />
              <InfoRow
                title={'Email'}
                titleClassName="text-gray-500"
                value={'Разрешен'}
                className="mt-2 text-gray-400"
              />
            </SettingBlocks>
          </Link>
          <Link href={'/home/settings/profile/socialMedia'}>
            <SettingBlocks
              title="Профиль пользователя"
              titleClassName={'mb-2'}
              hrefToLink={'/home/settings/profile/socialMedia'}
            >
              <Typography variant="regular" className="text-gray-400">
                Hi, I’m Alec Thompson, Decisions: If you can’t decide, the
                answer is no. If two equally difficult paths, choose the one
                more painful in the short term (pain avoidance is creating an
                illusion of equality).
              </Typography>
              <Divider className="mt-4 mb-4" />
              <InfoRow
                title="ФИО"
                titleClassName="text-gray-500"
                value={session?.user?.name ?? ''}
                className="mt-2 text-gray-400"
              />
              <InfoRow
                title="Телефон"
                titleClassName="text-gray-500"
                value={<a href="tel:+79254323243">+7 (925) 432 32 43</a>}
                className="mt-2 text-gray-400"
              />
              <InfoRow
                title="Email"
                titleClassName="text-gray-500"
                value={session?.user?.email ?? ''}
                className="mt-2 text-gray-400"
              />
              <InfoRow
                titleClassName="text-gray-500"
                title="Статус"
                value={'Тут будет статус'}
                className="mt-2 text-gray-400"
              />
            </SettingBlocks>
          </Link>
          <Link href={'/home/settings/profile/socialMedia'}>
            <SettingBlocks
              title="Cоц сети"
              hrefToLink={'/home/settings/profile/socialMedia'}
            >
              <InfoRow
                titleClassName="text-gray-500"
                title="ВК"
                value={'Тут будет статус'}
                className="mt-2 text-gray-400"
              />
              <InfoRow
                titleClassName="text-gray-500"
                title="Телеграм"
                value={'Тут будет статус'}
                className="mt-2 text-gray-400"
              />
              <InfoRow
                titleClassName="text-gray-500"
                title="Инстаграм"
                value={'Тут будет статус'}
                className="mt-2 text-gray-400"
              />
              <InfoRow
                titleClassName="text-gray-500"
                title="Faceebook"
                value={'Тут будет статус'}
                className="mt-2 text-gray-400"
              />
            </SettingBlocks>
          </Link>
        </div>
        <div className={' w-1/2 mx-auto my-0 bg-white p-4 rounded-lg'}>
          <div className={'py-6 flex'}>{children}</div>
        </div>
      </div>
    </div>
  );
}
