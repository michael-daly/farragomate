import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import UITable from '#/ui/table/UITable.jsx';

import { castVote } from '#/room/actions.js';


const votingColumns  =
[
	{ label: '', size: 100 },
];

const resultsColumns =
[
	{ label: 'Votes',    size: 5 },
	{ label: 'Author',   size: 10 },
	{ label: 'Sentence', size: 75 },
];

class Voting extends Component
{
	constructor ( props )
	{
		super (props);
	}

	selectSentence ( index )
	{
		this.props.castVote (Object.keys (this.props.sentences.sentences)[index]);
	}

	render ()
	{
		const { props } = this;

		const { id, wordbanks, votingEnabled } = props;

		const { sentences, vote } = props.sentences;
		const { list }            = props.clients;

		const columnInfo = votingEnabled ? votingColumns : resultsColumns;
		const onClick    = votingEnabled ? this.selectSentence.bind (this) : null;

		const rowValues = [];

		let selected  = -1;
		let currIndex = 0;

		for ( let authorID in sentences )
		{
			if ( !votingEnabled || authorID !== id )
			{
				const sentence = sentences[authorID];

				if ( authorID === vote )
				{
					selected = currIndex;
				}

				const rowArr = [];

				if ( !votingEnabled )
				{
					rowArr.push (sentence.votes, list[authorID].displayName);
				}

				rowArr.push (sentence.str);
				rowValues.push (rowArr);
			}

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
				onClick={onClick}
			/>
		);
	}
}


const mapStateToProps = ({ register, room }) =>
{
	return {
		id:        register.id,
		clients:   room.clients,
		wordbanks: room.wordbanks,
		sentences: room.sentences,
	};
};

const mapDispatchToProps = dispatch =>
{
	return {
		castVote ( ...args )
		{
			dispatch (castVote (...args));
		},
	};
};


export default connect (mapStateToProps, mapDispatchToProps) (Voting);
