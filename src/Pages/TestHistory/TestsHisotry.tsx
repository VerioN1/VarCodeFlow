// @ts-nocheck
import React, { memo } from 'react';
import {
  Button,
  chakra,
  Flex, Table, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, usePagination } from 'react-table';
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch/useFetch.hook';
import { getExperimentsForUser } from '../../services/Experiments.services';
import { IExperiment } from '../../Types/Tests.Types';
import FetchWrapper from '../../Components/FetchWrapper/FetchWrapper';

const TestsHistory = () => {
  const userData = useSelector((state: any) => state.userData);
  const state = useFetch<IExperiment[]>('tests-history', () => getExperimentsForUser(userData.email));
  const navigate = useNavigate();
  const data = React.useMemo(() => {
    if (state.data)
      return state.data.map((exp:IExperiment) => ({
        expId: exp._id, name: exp.experimentName, date: exp.activationDate, isTestFinished: exp.isTestInProgress ? 'No' : 'Yes',
      })).reverse();
    return [];
  }, [state.data]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'TEST ID',
        accessor: 'expId',
      },
      {
        Header: 'NAME',
        accessor: 'name',
      },
      {
        Header: 'TEST DATE',
        accessor: 'date',
      },
      {
        Header: 'COMPLETED?',
        accessor: 'isTestFinished',
      },
    ],
    [],
  );

  const {
    getTableProps, getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage, headerGroups, page, prepareRow,
    setPageSize,
    state: { pageSize },
  } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 5 } }, useSortBy, usePagination);

  return (
    <FetchWrapper state={state}>
      <Flex w="70%" pt="10%" h="50%" align="center" justify="center" flexDir="column">
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
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr
                  {...row.getRowProps()}
                  _hover={{ cursor: 'pointer' }}
                  onClick={() => (row.values.isTestFinished === 'No' ? navigate(`/NewTest/${row.values.expId}`) : navigate(`/FinishedTest/${row.values.expId}`))}
                >
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
        <Flex m={2}>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </Button>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((newPageSize) => (
              <option key={newPageSize} value={newPageSize}>
                Show
                {' '}
                {newPageSize}
              </option>
            ))}
          </select>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </Button>
        </Flex>
      </Flex>
    </FetchWrapper>
  );
};

export default memo(TestsHistory);
