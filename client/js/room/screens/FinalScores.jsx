import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import UITable from '#/ui/table/UITable.jsx';


const columnInfo =
[
	{ label: 'Score',  size: 5 },
	{ label: 'Author', size: 20 },
];

class FinalScores extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		const { list } = this.props;

		const rowValues = [];

		for ( let id in list )
		{
			rowValues.push ([list[id].score, list[id].displayName]);
		}

		rowValues.sort (( row1, row2 ) =>
		{
			return row2[0] - row1[0];
		});

		return (
			<UITable
				columnInfo={columnInfo}
				rowValues={rowValues}
				tableSize='small'
				headerText='Final Scores'
				emptyMessage='No players in the room (somehow)!'
			/>
		);
	}
}


const mapStateToProps = ({ room }) =>
{
	return { ...room.clients };
};

const mapDispatchToProps = dispatch =>
{
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (FinalScores);
