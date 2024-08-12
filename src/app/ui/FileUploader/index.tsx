import React, { ChangeEvent } from 'react';
import classes from './FileUploader.module.scss';
import clsx from 'clsx';
import { Show } from '@/app/ui';
import { MdOutlineCloudUpload } from 'react-icons/md';

interface FileUploaderProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  files: FileList | null;
  classNames?: string;
  isMulti?: boolean;
  labelText?: string;
}

const FileUploader = ({
  onChange,
  labelText = 'Выберите файл',
  files,
  classNames,
  isMulti,
}: FileUploaderProps) => {
  const showImagePreview = !isMulti && !!files?.[0];
  return (
    <>
      <input
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
        <div className={'w-1/2 flex justify-center'}>
          <img
            src={files?.[0] ? URL.createObjectURL(files?.[0]) : ''}
            className={'rounded-lg h-full object-cover'}
          />
        </div>
      </Show>
    </>
  );
};

export default FileUploader;
