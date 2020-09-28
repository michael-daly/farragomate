import React, { Fragment } from 'react';


const UITableRow = props =>
{
	const
	{
		rowIndex,
		values,
		isSelected,
		columnInfo,
		hasBorder,

		onClick = null,
	}
	= props;

	const numCols     = columnInfo.length;
	const numRows     = values.length;
	const isClickable = onClick !== null;

	const rowClass = 'table-row' +
	                 (!hasBorder  ? ' no-border'   : '') +
	                 (isSelected  ? ' highlighted' : '') +
	                 (isClickable ? ' clickable'   : '');

	const onRowClick = onClick === null ? null : event => onClick (rowIndex, event);

	return (
		<div className={rowClass} onClick={onRowClick}>
		{
			columnInfo.map (( column, colIndex ) =>
			{
				const colSize  = column.size;
				const colStyle = { width: `${colSize}%` };
				const colKey   = `table-column-${colIndex}-${values[colIndex]}-${isSelected}`;

				const colClass = 'table-column' +
				                 (colIndex >= numCols - 1 ? ' no-border' : '') +
				                 (isSelected ? ' highlighted' : '');

				return (
					<span key={colKey} className={colClass} style={colStyle}>
						{values[colIndex]}
					</span>
				);
			})
		}
		</div>
	);
};


export default UITableRow;
