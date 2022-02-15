// @ts-nocheck
import React, { FC } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, chakra,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import Card from '../../Card/Card';
import { IScan } from '../../../Types/Tests.Types';

const TestTable : FC<{ scans: IScan[] } & React.ReactNode> = ({ scans }) => {
  const [isTheSame, setIsTheSame] = React.useState(false);
  const data = React.useMemo(
    () => {
      if (scans) {
        return scans.map((scan) => ({ ...scan, elapsedTime: scan.elpasedTime ?? scan.elapsedTime }));
      } return [];
    },
    [scans],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Scan Time',
        accessor: 'date',
      },
      {
        Header: 'Elapsed Time',
        accessor: 'elapsedTime',
      },
      {
        Header: 'Bar Code QC',
        accessor: 'QC',
        isNumeric: true,
      },
      {
        Header: 'Bar Code',
        accessor: 'barCode',
      },
      {
        Header: 'Drum Round #',
        accessor: 'round',
      },
    ],
    [],
  );

  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
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
          {rows.map((row, index) => {
            prepareRow(row);
            if (row.values.round === rows[index - 1]?.values.round || index === 0) {
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              );
            } return (
              <Tr {...row.getRowProps()} background="blue.300">
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
