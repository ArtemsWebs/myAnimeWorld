import React, { ChangeEvent, useRef } from 'react';
import classes from './FileUploader.module.scss';
import clsx from 'clsx';
import { Show } from '@/app/ui';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { RiImageEditFill } from 'react-icons/ri';
import { MdImageNotSupported } from 'react-icons/md';

interface FileUploaderProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  files: FileList | null;
  classNames?: string;
  imgClassNames?: string;
  isMulti?: boolean;
  labelText?: string;
  onReset: () => void;
}

const FileUploader = ({
  onChange,
  labelText = 'Выберите файл',
  files,
  onReset,
  classNames,
  imgClassNames,
  isMulti,
}: FileUploaderProps) => {
  const showImagePreview = !isMulti && !!files?.[0];
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        ref={inputRef}
        id="file-input"
        type="file"
        multiple={isMulti}
        className={classes['file-uploader']}
        onChange={onChange}
      />
      <Show when={!files?.[0]}>
        <label
          className={clsx(
            'flex flex-col gap-4 min-w-[256px] min-h-[256px] border-2 border-cyan-300 border-dashed rounded-lg red text-center justify-center items-center cursor-pointer',
            classNames,
            'hover:border-cyan-500',
          )}
          htmlFor="file-input"
        >
          <MdOutlineCloudUpload size={40} />
          {labelText}
        </label>
      </Show>
      <Show when={showImagePreview}>
        <div className={clsx('flex justify-center relative', imgClassNames)}>
          <div
            onClick={() => {
              inputRef?.current?.click?.();
            }}
            className="opacity-0 transition-colors duration-500 hover:opacity-50 hover:bg-green-400 rounded-lg hover:backdrop-blur-md w-full h-1/2 absolute flex justify-center items-center"
          >
            <RiImageEditFill size={60} />
          </div>
          <div
            onClick={onReset}
            className="opacity-0 transition-colors duration-500 hover:opacity-50 hover:bg-red-400 rounded-lg  hover:backdrop-blur-md w-full h-1/2 absolute top-1/2 flex justify-center items-center"
          >
            <MdImageNotSupported size={60} />
          </div>
          <img
            src={files?.[0] ? URL.createObjectURL(files?.[0]) : ''}
            className={clsx(
              'rounded-lg h-[256px] w-[256px] object-cover',
              imgClassNames,
            )}
          />
        </div>
      </Show>
    </>
  );
};

export default FileUploader;
