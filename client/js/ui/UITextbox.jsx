import React, { Component } from 'react';


const UITextbox = props =>
{
	const
	{
		value,
		maxLength,
		onChange,

		placeholder = '',
		isPassword  = false,
		highlight   = false,
		disabled    = false,
	}
	= props;

	return (
		<input
			type={isPassword ? 'password' : 'text'}
			className={highlight ? 'chalk highlighted' : 'chalk'}
			maxLength={maxLength}
			value={value}
			placeholder={placeholder}
			disabled={disabled ? true : null}
			onChange={onChange}
		/>
	);
};


export default UITextbox;
