'use client';

import { FooterButtonsBlock } from '@/app/ui/Modal/components/FooterButtonsBlock';

import { Divider, Typography, Checkbox } from '@/app/ui';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConfidantionalSettingSchema } from '@/app/home/settings/profile/socialMedia/schemas/ProfileSettingSchema';

const Profile = () => {
  const { control } = useForm({
    resolver: zodResolver(ConfidantionalSettingSchema),
  });
  return (
    <div className={'w-full'}>
      <div className={'w-full'}>
        <Typography title={''} variant={'title'}>
          Настройка доступов
        </Typography>
        <Divider orientation={'horizontal'}></Divider>
      </div>
      <form className={'flex flex-col gap-4 p-3'}>
        <Typography variant={'subtitle'}>Уведомления:</Typography>
        <Controller
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              value={field.value}
              label={'Уведомления на рабочий стол'}
              onChange={(value) => {
                field.onChange(value);
              }}
            />
          )}
          name={'pushOnDesktop'}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              value={field.value}
              label={'Уведомления в личных чатах'}
              onChange={(value) => {
                field.onChange(value);
              }}
            />
          )}
          name={'showUnreadChatMessage'}
        />

        <Typography variant={'subtitle'}>Личная информация:</Typography>
        <Typography variant={'regular'}>Друзья:</Typography>
        <Controller
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              label={'Время захода'}
              onChange={(value) => {
                field.onChange(value);
              }}
            />
          )}
          name={'showTimeLastFriends'}
        />
        <Checkbox label={'Номер телефона'} onChange={() => {}} />
        <Checkbox label={'Имя'} onChange={() => {}} />
        <Checkbox label={'Дата рождения'} onChange={() => {}} />

        <Typography variant={'regular'}>Остальные:</Typography>
        <Checkbox label={'Время захода'} onChange={() => {}} />
        <Checkbox label={'Номер телефона'} onChange={() => {}} />
        <Checkbox label={'Имя'} onChange={() => {}} />
        <Checkbox label={'Дата рождения'} onChange={() => {}} />
      </form>
      <FooterButtonsBlock acceptTitle={'Сохранить'} declineTitle={'Отменить'} />
    </div>
  );
};

export default Profile;
