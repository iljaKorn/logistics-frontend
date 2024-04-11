import React from 'react';

function ColumnFilter({column: {filterValue, setFilter}}) {

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        />
    )
}

export default ColumnFilter;