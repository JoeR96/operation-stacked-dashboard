import React from 'react';

const ColumnSelector = ({ numColumns, onColumnChange }) => {
    return (
        <div>
            <button onClick={() => onColumnChange(Math.max(1, numColumns - 1))}>-</button>
            <span>{numColumns} Days</span>
            <button onClick={() => onColumnChange(numColumns + 1)}>+</button>
        </div>
    );
};

export default ColumnSelector;
