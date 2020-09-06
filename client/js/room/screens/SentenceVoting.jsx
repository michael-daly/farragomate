import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import UITable from '#/ui/UITable.jsx';

import { sentenceToStr, sentenceToStrArr } from '#/sentenceArray.js';


class SentenceVoting extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		const { props }           = this;
		const { wordbanks }       = props;
		const { clientSentences } = props.sentences;

		const rowValues = [];

		for ( let i in clientSentences )
		{
			const sentence = clientSentences[i];

			rowValues.push ([sentenceToStr (sentenceToStrArr (wordbanks, sentence.arr))]);
		}

		return (
			<div className='center-content'>
			{
				Object.keys (clientSentences).length <= 0 ?
					<div className='center-content'>No sentences to vote for!</div> :

					<Fragment>
						<h3 style={{ color: '#FFBB88' }}>Pick your favorite sentence!</h3>

						<div className='center-content table-container'>
							<UITable
								columnInfo={[{ label: '', size: 100 }]}
								rowValues={rowValues}
							/>
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
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (SentenceVoting);
