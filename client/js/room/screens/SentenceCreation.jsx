import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import Wordbank from '#/screens/Wordbank.jsx';
import UIButton from '#/ui/UIButton.jsx';

import { sentenceToStr, sentenceToStrArr }   from '#/sentenceArray.js';
import { addToSentence, removeFromSentence } from '#/room/actions.js';

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

		const sentenceArray = sentenceToStrArr (wordbanks, sentences.sentenceArray);

		return (
			<div style={{ padding: '2vw' }}>
			{
				wordbanks.length <= 0 ? <div className='center-content'>Loading...</div> :
					<Fragment>
						{
							wordbanks.map (( words, index ) =>
							{
								return <Wordbank
									key={`words-${index}`}
									words={words}
									bankIndex={index}
									onClickWord={props.addWord}
								/>;
							})
						}

						<div style={{ minHeight: '2.6vw' }}>{sentenceToStr (sentenceArray)}</div>

						<div
							className='chalk'
							style={{ marginTop: '1vw', minHeight: '2.6vw', overflowWrap: 'normal' }}
						>
						{
							sentenceArray.map (( word, index ) =>
							(
								<UIButton
									key={`sentence-tile-${index}-${word}`}
									className='magnet-small'
									text={word}
									onClick={() => props.removeWord (index * 2)}
								/>
							))
						}
						</div>
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
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (SentenceCreation);
