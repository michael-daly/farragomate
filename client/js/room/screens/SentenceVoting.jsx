import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import UITable from '#/ui/table/UITable.jsx';

import { castVote } from '#/room/actions.js';


class SentenceVoting extends Component
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

		const { id, wordbanks }   = props;
		const { sentences, vote } = props.sentences;

		const onClick   = this.selectSentence.bind (this);
		const rowValues = [];

		let selected  = -1;
		let currIndex = 0;

		for ( let authorID in sentences )
		{
			if ( authorID !== id )
			{
				if ( authorID === vote )
				{
					selected = currIndex;
				}

				rowValues.push ([sentences[authorID].str]);
			}

			currIndex++;
		}

		return (
			<UITable
				columnInfo={[{ label: '', size: 100 }]}
				rowValues={rowValues}
				selected={selected}
				tableSize='medium'
				headerText='Pick your favorite sentence!'
				emptyMessage='No sentences to vote for!'
				onClick={onClick}
			/>
		);
	}
}


const mapStateToProps = ({ register, room }) =>
{
	return { id: register.id, wordbanks: room.wordbanks, sentences: room.sentences };
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		castVote ( ...args )
		{
			dispatch (castVote (...args));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (SentenceVoting);
