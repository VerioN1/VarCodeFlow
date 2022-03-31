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
  const data = React.useMemo(
    () => {
      if (scans) {
        return [...scans].reverse();
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
    <Card w="100%" h="100%" overflowY="auto">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  textAlign="center"
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
            return (
              <Tr
                {...row.getRowProps()}
                borderTop={row.values.round === rows[index - 1]?.values.round || index === 0 ? null : '2px solid red'}
              >
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    textAlign="center"
                    background={cell.getCellProps().key.toString().includes('QC')
                      ? ((cell.value === '2' && 'rgb(62,235,102)') || (cell.value === '3' && 'rgb(53, 162, 235)') || (cell.value === '4' && 'rgb(255, 99, 132)'))
                      : null}
                  >
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
