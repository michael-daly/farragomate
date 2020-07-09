import React, { Component } from 'react';


const UITextbox = ({ value, maxLength, onChange }) =>
(
	<input
		type='text'
		className='chalk'
		maxLength={maxLength}
		value={value}
		onChange={onChange}
	/>
);


export default UITextbox;
