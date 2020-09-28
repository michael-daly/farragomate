import React, { Fragment } from 'react';

import UITableRow from '#/ui/table/UITableRow.jsx';


const UITable = props =>
{
	const
	{
		className  = '',
		columnInfo = [],
		rowValues  = [],

		headerText   = '',
		headerColor  = '#FFBB88',
		emptyMessage = '',
		tableSize    = 'medium',

		onClick = null,
	}
	= props;

	let { selected = [-1] } = props;

	if ( !Array.isArray (selected) )
	{
		selected = [selected];
	}

	if ( !(selected instanceof Set) )
	{
		selected = new Set (selected);
	}

	const numCols = columnInfo.length;
	const labels  = [];

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

	const table =
	(
		<div className={`table chalk-small ${className}`}>
		{
			rowValues.map (( row, rowIndex ) =>
			{
				const isSelected = selected.has (rowIndex);

				return (
					<UITableRow
						key={`table-row-${rowIndex}-${isSelected}}`}
						rowIndex={rowIndex}
						values={row}
						columnInfo={columnInfo}
						isSelected={isSelected}
						hasBorder={rowIndex < rowValues.length - 1}
						onClick={onClick}
					/>
				);
			})
		}
		</div>
	);

	return (
		<div className='center-content'>
			<h3 style={{ color: headerColor }}>{headerText}</h3>

			<div className={`center-content table-container-${tableSize}`}>
			{
				rowValues.length > 0 ? [labels, table] :
					<div className='center-content'>{emptyMessage}</div>
			}
			</div>
		</div>
	);
};


export default UITable;
