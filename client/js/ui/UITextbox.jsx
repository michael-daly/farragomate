import React, { Component } from 'react';


const UITextbox = ({ value, maxLength, onChange, placeholder = '', highlight = false }) =>
(
	<input
		type='text'
		className={highlight ? 'chalk highlighted' : 'chalk'}
		maxLength={maxLength}
		value={value}
		placeholder={placeholder}
		onChange={onChange}
	/>
);


export default UITextbox;
