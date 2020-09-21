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
		const { id, wordbanks, votingEnabled } = this.props;

		const { sentences, vote, dataSent, cachedNames } = this.props.sentences;

		const rowValues = [];

		let selected  = -1;
		let currIndex = 0;

		for ( let authorID in sentences )
		{
			const sentence = sentences[authorID];
			const rowArr   = [];

			if ( !votingEnabled )
			{
				rowArr.push (sentence.votes, cachedNames[authorID].displayName);
			}

			if ( authorID === vote )
			{
				selected = currIndex;
			}

			rowArr.push (sentence.str);
			rowValues.push (rowArr);

			currIndex++;
		}

		if ( !votingEnabled )
		{
			const selectedArr = selected >= 0 ? rowValues[selected] : null;

			rowValues.sort (( row1, row2 ) =>
			{
				return row2[0] - row1[0];
			});

			const { length } = rowValues;

			for ( let i = 0; i < length; i++ )
			{
				if ( rowValues[i] === selectedArr )
				{
					selected = i;
				}
			}
		}

		return (
			<UITable
				columnInfo={votingEnabled ? votingColumns : resultsColumns}
				rowValues={rowValues}
				selected={selected}
				tableSize={votingEnabled ? 'medium' : 'large'}
				headerText={votingEnabled ? 'Pick your favorite sentence!' : 'Voting Results'}
				emptyMessage={votingEnabled ? 'No sentences to vote for!' : 'No results to show!'}
				onClick={votingEnabled && !dataSent ? this.selectSentence.bind (this) : null}
			/>
		);
	}
}


const mapStateToProps = ({ register, room }) =>
{
	return { id: register.id, ...room };
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
