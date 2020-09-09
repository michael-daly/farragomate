import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import UITable from '#/ui/UITable.jsx';

import { castVote }                        from '#/room/actions.js';
import { sentenceToStr, sentenceToStrArr } from '#/sentenceArray.js';


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
			const sentence = sentences[authorID];

			if ( authorID !== id )
			{
				if ( authorID === vote )
				{
					selected = currIndex;
				}

				rowValues.push ([sentenceToStr (sentenceToStrArr (wordbanks, sentence.arr))]);
			}

			currIndex++;
		}

		return (
			<div className='center-content'>
			{
				rowValues.length <= 0 ?
					<div className='center-content'>No sentences to vote for!</div> :

					<Fragment>
						<h3 style={{ color: '#FFBB88' }}>Pick your favorite sentence!</h3>

						<div className='center-content table-container'>
							<UITable
								columnInfo={[{ label: '', size: 100 }]}
								rowValues={rowValues}
								onClick={onClick}
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
