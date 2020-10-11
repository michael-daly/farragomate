import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import UITable     from '#/ui/table/UITable.jsx';
import filterRules from '~/config/filterRules.js';

import { castVote }       from '#/room/actions.js';
import { censorBadWords } from '~/badWordFilter.js';


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
		const { list }  = props.clients;

		const { id, wordbanks, votingEnabled } = props;

		const { sentences, vote, dataSent, cachedNames } = props.sentences;

		const rowValues = [];

		let selected  = -1;
		let currIndex = 0;

		for ( let authorID in sentences )
		{
			const sentence = sentences[authorID];
			const rowArr   = [];

			const clientInfo = cachedNames[authorID] || list[authorID];

			if ( !votingEnabled )
			{
				rowArr.push (sentence.votes, clientInfo.displayName);
			}

			if ( authorID === vote )
			{
				selected = currIndex;
			}

			const sentenceStr = censorBadWords (sentence.str, filterRules.all);

			rowArr.push (censorBadWords (sentenceStr, filterRules.fields));
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
