import React from "react";
import {useTable, useFilters, useSortBy} from "react-table";
import ColumnFilter from "./ColumnFilter";

const EditableTable = ({columns, data, setData, handleButtonClick}) => {

    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: ColumnFilter,
        }),
        []
    )
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data,
            defaultColumn,
        }, useFilters, useSortBy);

    const handleInputChange = (event, row, columnId) => {
        const newData = data.map((rowData) => {
            if (rowData.id === row.original.id) {
                return {...rowData, [columnId]: event.target.value};
            }
            return rowData;
        });
        setData(newData);
    };

    const onSelectChange = (event, row, columnId) => {
        const newData = data.map((rowData) => {
            if (rowData.id === row.original.id) {
                return {...rowData, status: event.target.value};

            }
            return rowData;
        });
        setData(newData);
    };

    return (
        <table {...getTableProps()} >
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render("Header")}
                            <span>
                                {column.isSorted ? column.isSortedDesc ? ' V' : ' A' : ''}
                            </span>
                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return (
                                <td {...cell.getCellProps()}>
                                    {cell.column.editEnable ? (
                                        row.original.isEditing ? (
                                            cell.column.isStatus ? (
                                                <select onChange={(e) => onSelectChange(e, row, cell.column.id)}
                                                        value={row.original.status}>
                                                    {cell.column.statuses.map((option) => (
                                                        <option key={option.value}
                                                                value={option.value}>{option.label}</option>
                                                    ))}
                                                </select>) : (<input
                                                    type={cell.column.type}
                                                    defaultValue={cell.value}
                                                    onChange={(e) =>
                                                        handleInputChange(e, row, cell.column.id)
                                                    }
                                                />
                                            )
                                        ) : (
                                            cell.render("Cell")
                                        )
                                    ) : (
                                        cell.render("Cell")
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default EditableTable;