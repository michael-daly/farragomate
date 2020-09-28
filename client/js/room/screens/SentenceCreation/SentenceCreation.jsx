import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import Wordbank      from '#/SentenceCreation/Wordbank.jsx';
import SentenceTiles from '#/SentenceCreation/SentenceTiles.jsx';
import UIButton      from '#/ui/UIButton.jsx';

import { sentenceToStr, sentenceToStrArr } from '#/sentenceArray.js';

import
{
	addToSentence,
	removeFromSentence,
	moveSentenceWord,
	clearSentence,
}
from '#/room/actions.js';

import { MAX_SENTENCE_LEN } from '~/constants.js';


class SentenceCreation extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		const { props } = this;

		const { wordbanks, sentences } = props;

		const sentenceArray  = sentenceToStrArr (wordbanks, sentences.array);
		const disableButtons = sentences.dataSent;

		return (
			<div style={{ padding: '2vw' }}>
			{
				wordbanks.length <= 0 ? <div className='center-content'>Loading...</div> :
					<Fragment>
						{
							wordbanks.map (( words, index ) =>
							{
								return <Wordbank
									key={`wordbank-${index}`}
									words={words}
									bankIndex={index}
									onClickWord={props.addWord}
									disabled={disableButtons}
								/>;
							})
						}

						<div style={{ minHeight: '2.6vw', whiteSpace: 'pre' }}>
							{sentenceToStr (sentenceArray)}
						</div>

						<SentenceTiles
							words={sentenceArray}
							onClickWord={( word, index ) => props.removeWord (index * 2)}
							onClickClear={props.clearWords}
							onMoveWord={props.moveWord}
							disabled={disableButtons}
						/>
					</Fragment>
			}
			</div>
		);
	}
}


const mapStateToProps = ({ room }) =>
{
	return { wordbanks: room.wordbanks, sentences: room.sentences };
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		addWord ( bankIndex, wordIndex )
		{
			dispatch (addToSentence (bankIndex, wordIndex));
		},

		removeWord ( index )
		{
			dispatch (removeFromSentence (index));
		},

		moveWord ( oldIndex, newIndex )
		{
			dispatch (moveSentenceWord (oldIndex, newIndex));
		},

		clearWords ()
		{
			dispatch (clearSentence ());
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (SentenceCreation);
