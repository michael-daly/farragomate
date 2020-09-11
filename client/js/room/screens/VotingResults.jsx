import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import UITable from '#/ui/UITable.jsx';

import { sentenceToStr, sentenceToStrArr } from '#/sentenceArray.js';


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
			const sentence    = sentences[authorID];
			const sentenceStr = sentenceToStr (sentenceToStrArr (wordbanks, sentence.arr));

			if ( authorID === vote )
			{
				selected = currIndex;
			}

			rowValues.push ([sentence.votes, list[authorID].displayName, sentenceStr]);

			currIndex++;
		}

		return (
			<div className='center-content'>
			{
				rowValues.length <= 0 ?
					<div className='center-content'>No results to show!</div> :

					<Fragment>
						<h3 style={{ color: '#FFBB88' }}>Voting Results</h3>

						<div className='center-content table-container-large'>
							<UITable
								columnInfo={columnInfo}
								rowValues={rowValues}
								selected={selected}
							/>
						</div>
					</Fragment>
			}
			</div>
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
