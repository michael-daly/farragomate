import React, { Component } from 'react';


const UITextbox = props =>
{
	const { value, maxLength, onChange, isPassword = false, placeholder = '', highlight = false } = props;

	return (
		<input
			type={isPassword ? 'password' : 'text'}
			className={highlight ? 'chalk highlighted' : 'chalk'}
			maxLength={maxLength}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
};


export default UITextbox;
