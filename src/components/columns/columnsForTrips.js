import React from "react";

export const ColumnsForTrips = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "Departed",
        accessor: "departed",
        editEnable: true,
        type: "text",
    },
    {
        Header: "Arrival",
        accessor: "arrival",
        editEnable: true,
        type: "text",
    },
    {
        Header: "Status",
        accessor: "status",
        editEnable: true,
        isStatus: true,
        statuses: [
            { value: "Processing", label: "Processing" },
            { value: "OnTheWay", label: "OnTheWay" },
            { value: "Delivered", label: "Delivered" },
            { value: "Delayed", label: "Delayed" },
        ],

    },
    {
        Header: "Create Date",
        accessor: "createDate",
        editEnable: true,
        type: "date",
    },
    {
        Header: "Arrival Date",
        accessor: "arrivalDate",
        editEnable: true,
        type: "date",
    },
    {
        Header: "Departed Date",
        accessor: "dapartedDate",
        editEnable: true,
        type: "date"
    },
    {
        Header: "Client",
        accessor: "client",
        editEnable: true,
        type: "text",
    },
    {
        Header: "Actions",
        id: "actions",
        disableSortBy: true,
        Cell: ({row, column, cell}) =>
            row.original.isEditing ? (
                <div className="edit-cell-container">
                    <div className={"edit-cell"}>
                        <button name={"done"} onClick={() => handleButtonClick("save", row.original)}>
                            Save
                        </button>
                        <button name={"cancel"} onClick={() => handleButtonClick("cancel", row.original)}>
                            Cancel
                        </button>
                    </div>

                </div>
            ) : (
                <div className="edit-cell-container">
                    <button onClick={() => handleButtonClick("edit", row.original)}>
                        Edit
                    </button>
                </div>
            ),
    },
];