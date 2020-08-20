import React from 'react';

import UIButton from '#/ui/UIButton.jsx';


const Wordbank = ({ words }) =>
(
	<div className='chalk-small' style={{ margin: '1vw' }}>
	{
		words.length <= 0 ? 'Loading...' :

		words.map (word =>
		{
			return <UIButton className='magnet-small' text={word} />;
		})
	}
	</div>
);


export default Wordbank;
