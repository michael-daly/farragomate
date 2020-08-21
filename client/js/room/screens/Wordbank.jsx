import React from 'react';

import UIButton from '#/ui/UIButton.jsx';


const Wordbank = ({ words, bankIndex, onClickWord = () => {} }) =>
(
	<div className='chalk-small' style={{ margin: '1vw', padding: '0.7vw' }}>
	{
		words.length <= 0 ? 'Loading...' :
			words.map (( word, wordIndex ) =>
			{
				return <UIButton
					key={`word-${bankIndex}-${word}`}
					className='magnet-small'
					text={word}
					onClick={event => onClickWord (bankIndex, wordIndex, event)}
				/>;
			})
	}
	</div>
);


export default Wordbank;
