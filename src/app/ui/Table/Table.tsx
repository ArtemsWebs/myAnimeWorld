import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface TableProps {
  columns: any[];
  data: any[];
}

const Table = ({ columns, data }: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={'w-full rounded-lg'}>
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
      <tbody>
        {table.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id + row.original.name + index}
            className={'bg-neutral-50 min-h-[60px] border-2 border-b-zinc-300'}
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
      {/*<tfoot>*/}
      {/*  {table.getFooterGroups().map((footerGroup) => (*/}
      {/*    <tr key={footerGroup.id}>*/}
      {/*      {footerGroup.headers.map((header) => (*/}
      {/*        <th key={header.id + header.index}>*/}
      {/*          {header.isPlaceholder*/}
      {/*            ? null*/}
      {/*            : flexRender(*/}
      {/*                header.column.columnDef.footer,*/}
      {/*                header.getContext(),*/}
      {/*              )}*/}
      {/*        </th>*/}
      {/*      ))}*/}
      {/*    </tr>*/}
      {/*  ))}*/}
      {/*</tfoot>*/}
    </table>
  );
};

export default Table;
