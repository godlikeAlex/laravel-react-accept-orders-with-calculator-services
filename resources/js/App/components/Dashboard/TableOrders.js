import React from 'react';
import { usePagination, useTable } from 'react-table';

const TableOrders = ({ setPerPage, setPage, columns, data, page, totalPage }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        pageOptions,
        state: { pageIndex, pageSize },
    } = useTable({
        columns,
        data,
        useControlledState: (state) => {
            return React.useMemo(
                () => ({
                    ...state,
                    pageIndex: page,
                }),
                [state, page]
            );
        },
        initialState: { pageIndex: page }, // Pass our hoisted table state
        manualPagination: true,
        pageCount: totalPage,
    }, usePagination)

    return (
        <>
            <table id="timetable" className="table_template" {...getTableProps()} >
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex justify-between bg-red-100 p-4">
                <button
                    onClick={() => {
                        setPage(1);
                    }}
                    disabled={page === 1}
                >
                    first
                </button>{' '}
                <button
                    onClick={() => {
                        setPage((s) => (s === 0 ? 0 : s - 1));
                    }}
                    disabled={page === 1}
                >
                    prev
                </button>{' '}
                <button
                    onClick={() => {
                        setPage((s) => s + 1);
                    }}
                    disabled={page === totalPage}
                >
                    next
                </button>{' '}
                <button
                    onClick={() => {
                        setPage(totalPage);
                    }}
                    disabled={page === totalPage}
                >
                    last
                </button>{' '}
            </div>
        </>
    )
}

export default TableOrders;