import React, { Component } from 'react';

import UIPopup   from '#/ui/popup/UIPopup.jsx';
import UIButton  from '#/ui/UIButton.jsx';
import UITextbox from '#/ui/UITextbox.jsx';

import fieldData from '~/rooms/fieldData.js';


const PasswordPopup = props =>
(
	<UIPopup
		title='Password Required'
		button1Text='Cancel'
		button2Text='Join'
		numButtons={2}
		onClickButton1={props.onClickCancel}
		onClickButton2={props.onClickJoin}
	>
		<label>Password:</label>

		<UITextbox
			isPassword={true}
			maxLength={fieldData.password.max}
			value={props.value}
			onChange={props.onChange}
		/>
	</UIPopup>
);


export default PasswordPopup;
