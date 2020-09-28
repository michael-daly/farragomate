import React from 'react';

import UIButton from '#/ui/UIButton.jsx';


const Wordbank = ({ words, bankIndex, disabled = false, onClickWord = () => {} }) =>
(
	<div
		className='chalk-small'
		style={{ marginBottom: '1vw', padding: '0.7vw', overflowWrap: 'normal' }}
	>
	{
		words.length <= 0 ? 'Loading...' :
			words.map (( word, wordIndex ) =>
			{
				return <UIButton
					key={`word-${bankIndex}-${word}`}
					className='magnet-small'
					text={word}
					onClick={event => onClickWord (bankIndex, wordIndex, event)}
					disabled={disabled}
				/>;
			})
	}
	</div>
);


export default Wordbank;
