import React, { Fragment } from 'react';

import { sentenceToStr, sentenceToStrArr } from '#/sentenceArray.js';


const UITable = props =>
{
	const
	{
		className  = '',
		selected   = -1,
		columnInfo = [],
		rowValues  = [],

		onClick = null,
	}
	= props;

	const isClickable = onClick !== null;

	const numCols = columnInfo.length;
	const numRows = rowValues.length;

	const labels = [];

	for ( let i = 0; i < numCols; i++ )
	{
		const column = columnInfo[i];
		const style  = { width: `${column.size || 0}%` };

		const labelElement =
		(
			<span key={`table-label-${i}-${column.label}`} className='table-label' style={style}>
				{column.label}
			</span>
		);

		labels.push (labelElement);
	}

	return (
		<Fragment>
			{labels}

			<div className={`table chalk-small ${className}`}>
			{
				rowValues.map (( row, rowIndex ) =>
				{
					const isSelected = rowIndex === selected;

					const rowKey   = `table-row-${rowIndex}-${isSelected}`;
					const rowClass = 'table-row' +
					                 (rowIndex >= numRows - 1 ? ' no-border' : '') +
					                 (isSelected  ? ' highlighted' : '') +
					                 (isClickable ? ' clickable'   : '');

					const onRowClick = onClick === null ? null : event => onClick (rowIndex, event);

					return (
						<div key={rowKey} className={rowClass} onClick={onRowClick}>
						{
							columnInfo.map (( column, colIndex ) =>
							{
								const colSize  = column.size;
								const colValue = row[colIndex] || '';
								const colStyle = { width: `${colSize}%` };
								const colKey   = `table-column-${colIndex}-${colSize}-${isSelected}`;

								const colClass = 'table-column' +
								                 (colIndex >= numCols - 1 ? ' no-border' : '') +
								                 (isSelected ? ' highlighted' : '');

								return (
									<span key={colKey} className={colClass} style={colStyle}>
										{colValue}
									</span>
								);
							})
						}
						</div>
					);
				})
			}
			</div>
		</Fragment>
	);
};


export default UITable;
