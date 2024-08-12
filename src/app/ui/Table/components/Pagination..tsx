import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Typography from '@/app/ui/Typography';
import { Table } from '@tanstack/table-core';
import { IconButton, Select } from '@/app/ui';
import { useMemo } from 'react';

interface PaginationProps {
  table: Table<any>;
  pagination: { pageIndex: number; pageSize: number };
}

const getOptionForPageSize = (pageSize: number) => {
  return { value: pageSize, label: String(pageSize) };
};

const pageSizeOptions = [
  { value: 10, label: '10' },
  { value: 15, label: '15' },
];

const Pagination = ({ table, pagination }: PaginationProps) => {
  const { currentMaxRows, allMaxRow, actualPageIndex } = useMemo(() => {
    return {
      currentMaxRows:
        pagination.pageSize *
        (pagination.pageIndex === 0 ? 1 : pagination.pageIndex + 1),
      allMaxRow: table.getRowCount(),
      actualPageIndex:
        pagination.pageIndex === 0 ? 1 : pagination.pageIndex + 1,
    };
  }, [pagination.pageSize, pagination.pageIndex, table]);

  return (
    <div className={'flex bg-white justify-between w-full p-4'}>
      <div className="text-center items-center flex gap-4">
        <Typography component={'p'} variant={'button'}>
          {'По'}
        </Typography>
        <Select
          className={'min-w-[80px]'}
          options={pageSizeOptions}
          value={getOptionForPageSize(pagination.pageSize)}
          defaultValue={getOptionForPageSize(pagination.pageSize)}
          onChange={(newValue) =>
            table.setPagination((prev) => ({
              ...prev,
              pageSize: newValue?.value ?? prev.pageSize,
            }))
          }
          isMulti={false}
        />
        <Typography
          component={'p'}
          variant={'regular'}
        >{`${pagination.pageSize * actualPageIndex - pagination.pageSize} - ${currentMaxRows > allMaxRow ? allMaxRow : currentMaxRows} из ${allMaxRow}`}</Typography>
      </div>
      <div className={'flex items-center'}>
        <IconButton
          onClick={() => {
            if (table.getCanPreviousPage()) {
              table.previousPage();
            }
          }}
        >
          <MdKeyboardArrowLeft />
        </IconButton>
        <Typography component={'p'} variant={'regular'}>
          {actualPageIndex}
        </Typography>
        <IconButton
          className={'justify-end'}
          onClick={() => {
            if (table.getCanNextPage()) {
              table.nextPage();
            }
          }}
        >
          <MdKeyboardArrowRight />
        </IconButton>
      </div>
    </div>
  );
};

export default Pagination;
