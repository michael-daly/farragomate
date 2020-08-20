import React from 'react';

import UIButton from '#/ui/UIButton.jsx';


const Wordbank = ({ words, index }) =>
(
	<div className='chalk-small' style={{ margin: '1vw', padding: '0.7vw' }}>
	{
		words.length <= 0 ? 'Loading...' :

		words.map (word =>
		{
			return <UIButton key={`word-${index}-${word}`} className='magnet-small' text={word} />;
		})
	}
	</div>
);


export default Wordbank;
