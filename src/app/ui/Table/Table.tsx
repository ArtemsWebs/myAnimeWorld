import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import Pagination from '@/app/ui/Table/components/Pagination.';
import clsx from 'clsx';

interface TableProps {
  columns: any[];
  data: any[];
  getRowClassName?: (row: any) => string;
}

const Table = ({ columns, data, getRowClassName }: TableProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    rowCount: data.length,
    state: {
      pagination,
    },
  });

  return (
    <>
      <table className={'w-full rounded-lg '}>
        <thead className={'bg-white min-h-[60px]'}>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={headerGroup.id + index} className={'pl-[16px]'}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id + index}
                  className={'h-[60px] text-start pl-[16px]'}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={'max-h-[900px]'}>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id + row.original.name + index}
              className={clsx(
                getRowClassName?.(row),
                'bg-neutral-50 min-h-[60px] border-2 border-b-zinc-300',
              )}
            >
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id + index}
                  className={'h-[60px] text-start pl-[16px]'}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
      <Pagination table={table} pagination={pagination} />
    </>
  );
};

export default Table;
