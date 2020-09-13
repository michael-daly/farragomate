import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import UITable from '#/ui/table/UITable.jsx';


const columnInfo =
[
	{ label: 'Votes',    size: 5 },
	{ label: 'Author',   size: 10 },
	{ label: 'Sentence', size: 75 },
];

class VotingResults extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		const { props } = this;

		const { id, wordbanks }   = props;
		const { sentences, vote } = props.sentences;
		const { list }            = props.clients;

		const rowValues = [];

		let selected  = -1;
		let currIndex = 0;

		for ( let authorID in sentences )
		{
			const sentence = sentences[authorID];

			if ( authorID === vote )
			{
				selected = currIndex;
			}

			rowValues.push ([sentence.votes, list[authorID].displayName, sentence.str]);

			currIndex++;
		}

		return (
			<UITable
				columnInfo={columnInfo}
				rowValues={rowValues}
				selected={selected}
				tableSize='large'
				headerText='Voting Results'
				emptyMessage='No results to show!'
			/>
		);
	}
}


const mapStateToProps = ({ register, room }) =>
{
	return { clients: room.clients, wordbanks: room.wordbanks, sentences: room.sentences };
};

const mapDispatchToProps = dispatch =>
{
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (VotingResults);
