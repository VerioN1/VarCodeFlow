import React, { FC } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, chakra,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import Card from '../../Card/Card';
import { IScan } from '../../../Types/Tests.Types';

const TestTable : FC<{ scans: IScan[] } & React.ReactNode> = ({ scans }) => {
  console.log(scans);
  const data = React.useMemo(
    () => scans,
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'To convert',
        accessor: 'testID',
      },
      {
        Header: 'Into',
        accessor: 'date',
      },
      {
        Header: 'Multiply by',
        accessor: 'barCode',
        isNumeric: true,
      },
    ],
    [],
  );

  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  // @ts-ignore
  } = useTable({ columns, data }, useSortBy);

  return (
    <Card w="100%" h="100%" maxH="50vh" overflowY="auto">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
};

export default TestTable;
