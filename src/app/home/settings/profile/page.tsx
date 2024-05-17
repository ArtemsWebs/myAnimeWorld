'use client';
import useSWR from 'swr';
import { getSession } from 'next-auth/react';
import Typography from '@/app/ui/Typography';
import { Divider, InfoRow, ToggleButtons } from '@/app/ui';
import { ToggleButtonOption } from '@/app/ui/ToggleButtons/type';
import { LuBoxes } from 'react-icons/lu';
import { HiMiniUsers } from 'react-icons/hi2';
import { FcStatistics } from 'react-icons/fc';
import SettingBlocks from './_components/SettingBlock';

const toggleOptions: ToggleButtonOption[] = [
  { label: 'Общие', icon: <LuBoxes />, onClick: () => {} },
  { label: 'Друзья', icon: <HiMiniUsers />, onClick: () => {} },
  { label: 'Статистика', icon: <FcStatistics />, onClick: () => {} },
];

const Profile = () => {
  const { data: session } = useSWR(
    '_session',
    async (_key) => await getSession(),
  );

  return (
    <div className="w-full">
      <div className="w-full bg-teal-400 h-[200px] rounded-lg p-4 relative">
        <div>Breadcrumbs</div>
        <Typography variant="subtitle" className="text-white">
          Профиль
        </Typography>
        <div className="absolute bg-white backdrop-blur-lg bg-white/30 w-[95%] h-[120px] top-[140px] rounded-lg right-10 flex items-center p-4 justify-between">
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
        <div className="flex gap-6">
          <SettingBlocks
            title="Настройки доступов"
            className="mt-[235px]"
            titleClassName={'mb-2'}
          >
            <Typography variant="subtitle" component="p">
              Аккаунт
            </Typography>
            <div>Что-то</div>
            <div>Что-то</div>
            <div>Что-то</div>
            <Typography variant="subtitle" component="p">
              Аккаунт
            </Typography>
            <div>Что-то</div>
            <div>Что-то</div>
            <div>Что-то</div>
          </SettingBlocks>
          <SettingBlocks
            title="Профиль пользователя"
            className="mt-[235px]"
            titleClassName={'mb-2'}
          >
            <Typography variant="regular" className="text-gray-400">
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).
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
            <InfoRow
              titleClassName="text-gray-500"
              title="Социальные сети"
              value={'Тут будут соц сети'}
              className="mt-2 text-gray-400"
            />
          </SettingBlocks>
          <SettingBlocks title="Настройки доступов" className="mt-[235px]">
            <div></div>
          </SettingBlocks>
        </div>
      </div>
    </div>
  );
};

export default Profile;
