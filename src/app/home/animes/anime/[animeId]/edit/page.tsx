'use client';
import FileUploader from '@/app/ui/FileUploader';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import BaseModalInput from '@/app/ui/BaseModalInput/BaseModalInput';
import {
  EditAnimeSchema,
  EditAnimeSchemaType,
} from '@/app/home/animes/anime/[animeId]/edit/components/schema/EditAnime.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@/app/ui/DatePicker/DatePicker';
import { Divider, Select } from '@/app/ui';
import useSWR from 'swr';
import {
  getAllGenres,
  getAllLicensors,
  getAllProducers,
  getAllStudios,
  getAnimeById,
  getGenresForAnime,
} from '@/app/home/animes/fetchers/animeFetchers';
import { animeRatings } from '@/app/lib/dictinary/dictinary';
import { useParams } from 'next/navigation';
import FormButtonBlock from '@/app/ui/FormButtonBlock/FormButtonBlock';
import { updateAnime } from '@/app/home/animes/anime/[animeId]/edit/fetchers/fetchers';
import MyEditor from '@/app/ui/Editor/Editor';

const editHandleSubmit = async (
  value: EditAnimeSchemaType,
  animeId: number,
) => {
  const description = value.description.blocks.map((block) => {
    return `<p style={{${block.inlineStyleRanges.reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue.style;
      },
      '',
    )}}}>${block.text}</p>`;
  });
  console.log(description);
  return await updateAnime(animeId, value);
};

const AnimeEditPage = () => {
  const [animeTitleImage, setAnimeTitleImage] = useState<null | FileList>(null);
  const {
    control,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<EditAnimeSchemaType>({
    resolver: zodResolver(EditAnimeSchema),
  });
  const params = useParams<{ animeId: string }>();
  const referedParams = useRef(params);

  const description = watch('description')?.blocks?.map((block) => {
    return `<p style={{${block.inlineStyleRanges.reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue.style;
      },
      '',
    )}}}>${block.text}</p>`;
  });

  console.log(description);
  useSWR(
    ['/genresForAnime', referedParams.current.animeId],
    async ([_key, animeId]) => getGenresForAnime(animeId),
    {
      onSuccess: (data) => {
        if (data.data) {
          setValue(
            'genres',
            data.data.map((genre) => ({
              value: genre.id,
              label: genre.name ?? '',
            })),
          );
        }
      },
    },
  );

  const { data: animeData } = useSWR(
    ['/currentAnime', referedParams.current.animeId],
    async ([_key, animeId]) => getAnimeById(animeId),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        const durationInString = data?.data?.duration?.split(' ')[0];
        const raitingInStirng = data?.data?.rating?.split(' ')[0];

        if (durationInString) {
          setValue('duration', Number(durationInString));
        }
        if (raitingInStirng) {
          const animeRaitingXor = animeRatings.find(
            (raiting) => raiting.value === raitingInStirng,
          );
          setValue('raiting', {
            value: animeRaitingXor?.value ?? '',
            key: animeRaitingXor?.key ?? '',
            description: animeRaitingXor?.description ?? '',
          });
        }
        setValue('episodes', data?.data?.episodes ?? 0);
        setValue('name', data?.data?.title ?? '');
        setValue('licensors', data?.data?.licensors ?? []);
        setValue('producers', data?.data?.producers ?? []);
      },
    },
  );

  useEffect(() => {
    console.log(animeTitleImage);
    if (!animeTitleImage && animeData?.data?.images?.jpg?.large_image_url) {
      fetch(animeData.data.images.jpg.large_image_url)
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          setAnimeTitleImage([
            new File([blob], animeData.data.title ?? ''),
          ] as unknown as FileList);
        });
    }
  }, [animeData]);

  const { data: allGenres } = useSWR(
    ['allGenres'],
    async (_key) => await getAllGenres(),
    {
      revalidateOnFocus: false,
    },
  );
  const { data: allLicensors } = useSWR(
    ['allLicensors'],
    async (_key) => await getAllLicensors(),
    {
      revalidateOnFocus: false,
    },
  );

  const { data: allProducers } = useSWR(
    ['allProducer'],
    async (_key) => await getAllProducers(),
    {
      revalidateOnFocus: false,
    },
  );

  const { data: allStudio } = useSWR(
    ['allStudios'],
    async (_key) => await getAllStudios(),
    { revalidateOnFocus: false },
  );

  const genresOption = useMemo(
    () =>
      allGenres?.data?.map((genre) => ({
        value: genre.id,
        label: genre.name ?? '',
      })),
    [allGenres?.data],
  );

  return (
    <form
      className={'p-10 flex justify-center'}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit((data, event) =>
          editHandleSubmit(data, Number(referedParams.current.animeId)),
        )();
      }}
    >
      <div className="flex gap-10 ">
        <FileUploader
          labelText="Загрузите картинку профиля"
          imgClassNames="h-[512px] w-[512px]  shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
          classNames="h-[512px] w-[512px]"
          files={animeTitleImage}
          onChange={(event) => {
            setAnimeTitleImage(event.target.files);
          }}
          onReset={() => {
            setAnimeTitleImage(null);
          }}
        />
        <div className={'flex flex-col gap-[12px]'}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState, formState }) => {
              return (
                <BaseModalInput
                  {...field}
                  className={'min-w-[250px]'}
                  labelClassNames={'text-zinc-50'}
                  errorText={fieldState.error?.message}
                  label="Название аниме"
                  onChange={(e) => {
                    field.onChange(e.currentTarget.value);
                  }}
                />
              );
            }}
          />
          <div className={'flex gap-10'}>
            <Controller
              control={control}
              name="episodes"
              render={({ field, fieldState, formState }) => {
                return (
                  <BaseModalInput
                    {...field}
                    type={'number'}
                    inputMode={'numeric'}
                    min={0}
                    className={'min-w-[250px] '}
                    labelClassNames={'text-zinc-50'}
                    defaultValue={0}
                    errorText={fieldState.error?.message}
                    label="Количество эпизодов"
                    onChange={(e) => {
                      field.onChange(e.currentTarget.value);
                    }}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="raiting"
              render={({ field, fieldState, formState }) => {
                return (
                  <Select
                    {...field}
                    labelClassNames={'text-zinc-50'}
                    styles={{
                      // Fixes the overlapping problem of the component
                      menu: (provided) => ({ ...provided, zIndex: 9999 }),
                    }}
                    getOptionLabel={(value) =>
                      `${value.value} - ${value.description}`
                    }
                    placeholder={'Возрастной рейтинг'}
                    options={animeRatings ?? []}
                    className={'min-w-[250px] w-[250px]'}
                    label="Возрастной рейтинг"
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="duration"
              render={({ field, fieldState, formState }) => {
                return (
                  <BaseModalInput
                    {...field}
                    type={'number'}
                    inputMode={'numeric'}
                    min={0}
                    className={'min-w-[250px] '}
                    labelClassNames={'text-zinc-50'}
                    defaultValue={0}
                    errorText={fieldState.error?.message}
                    label="Продолжительность серии"
                    onChange={(e) => {
                      field.onChange(e.currentTarget.value);
                    }}
                  />
                );
              }}
            />
          </div>

          <div className={'flex gap-[20px] items-center'}>
            <Controller
              control={control}
              name="dateStart"
              render={({ field, fieldState, formState }) => {
                return (
                  <DatePicker
                    {...field}
                    labelClassNames={'text-zinc-50'}
                    label={'Дата начала показа'}
                    onChange={(value) => field.onChange(value)}
                  />
                );
              }}
            />
            <Divider
              orientation={'horizontal'}
              className={'w-[24px] mt-[39px]'}
            />
            <Controller
              control={control}
              name="dateEnd"
              render={({ field, fieldState, formState }) => {
                return (
                  <DatePicker
                    {...field}
                    labelClassNames={'text-zinc-50'}
                    label={'Дата окончания показа'}
                    onChange={(value) => field.onChange(value)}
                  />
                );
              }}
            />
          </div>
          <Controller
            control={control}
            name="genres"
            render={({ field, fieldState, formState }) => {
              return (
                <Select
                  {...field}
                  isMulti
                  labelClassNames={'text-zinc-50'}
                  styles={{
                    // Fixes the overlapping problem of the component
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  placeholder={'Выберите жанры'}
                  options={genresOption ?? []}
                  className={'min-w-[250px]'}
                  label="Жанры аниме"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="licensors"
            render={({ field, fieldState, formState }) => {
              return (
                <Select
                  {...field}
                  isMulti
                  labelClassNames={'text-zinc-50'}
                  styles={{
                    // Fixes the overlapping problem of the component
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  getOptionLabel={(value) => value.name}
                  getOptionValue={(value) => String(value.id)}
                  placeholder={'Выберите лицензоров'}
                  options={allLicensors?.data ?? []}
                  className={'min-w-[250px]'}
                  label="Лицензоры"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="producers"
            render={({ field, fieldState, formState }) => {
              return (
                <Select
                  {...field}
                  isMulti
                  labelClassNames={'text-zinc-50'}
                  styles={{
                    // Fixes the overlapping problem of the component
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  getOptionLabel={(value) => value.name}
                  getOptionValue={(value) => String(value.id)}
                  placeholder={'Выберите продюссеров'}
                  options={allProducers?.data ?? []}
                  className={'min-w-[250px]'}
                  label="Продюссеры"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="studios"
            render={({ field, fieldState, formState }) => {
              return (
                <Select
                  {...field}
                  isMulti
                  labelClassNames={'text-zinc-50'}
                  styles={{
                    // Fixes the overlapping problem of the component
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  getOptionLabel={(value) => value.name}
                  getOptionValue={(value) => String(value.id)}
                  placeholder={'Выберите студии'}
                  options={allStudio?.data ?? []}
                  className={'min-w-[250px]'}
                  label="Студии"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              );
            }}
          />
          {/*<div className={'flex items-center gap-10'}>*/}
          {/*  <Controller*/}
          {/*    control={control}*/}
          {/*    name="dateEnd"*/}
          {/*    render={({ field, fieldState, formState }) => {*/}
          {/*      return <DatePicker label={'Дата окончания показа'} />;*/}
          {/*    }}*/}
          {/*  />*/}
          {/*  <Divider*/}
          {/*    orientation={'horizontal'}*/}
          {/*    className={'w-[24px] mt-[39px]'}*/}
          {/*  />*/}
          {/*  <Controller*/}
          {/*    control={control}*/}
          {/*    name="dateStart"*/}
          {/*    render={({ field, fieldState, formState }) => {*/}
          {/*      return <DatePicker label={'Дата начала показа'} />;*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</div>*/}
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState, formState }) => {
              return (
                <div>
                  <label
                    htmlFor="animeDescriptionEditor"
                    className="block mb-2 text-sm font-medium text-zinc-50"
                  >
                    Описание
                  </label>
                  <MyEditor />
                </div>
              );
            }}
          />
          <FormButtonBlock onSuccess={() => {}} onCancel={() => {}} />
        </div>
      </div>
    </form>
  );
};

export default AnimeEditPage;
