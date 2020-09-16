import React, { Component } from 'react';

import UIButton from '#/ui/UIButton.jsx';


const UIPopup = props =>
{
	const
	{
		title    = '',
		children = [],

		numButtons  = 1,
		button1Text = 'OK',
		button2Text = 'Cancel',

		onClickButton1 = null,
		onClickButton2 = null,
	}
	= props;

	return (
		<div className='popup-overlay'>
			<div className='popup-window'>
				<div className='popup-title'>
					{title}
				</div>

				<div className='popup-body'>
					{children}
				</div>

				<div className='popup-buttons center-content'>
				{
					numButtons > 0 ?
						<UIButton
							style={numButtons > 1 ? { marginRight: '5%' } : null}
							className='chalk'
							text={button1Text}
							onClick={onClickButton1}
						/> : ''
				}
				{
					numButtons > 1 ?
						<UIButton
							style={{ marginLeft: '5%' }}
							className='chalk'
							text={button2Text}
							onClick={onClickButton2}
						/> : ''
				}
				</div>
			</div>
		</div>
	);
};


export default UIPopup;
