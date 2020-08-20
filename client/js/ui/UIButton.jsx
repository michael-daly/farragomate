import React, { Component } from 'react';


const UIButton = ({ text, onClick, className = '', disabled = false, inline = true, style = {} }) =>
{
	let classNames = ['button', className];

	classNames.push (disabled ? 'disabled' : 'enabled');

	if ( disabled )
	{
		onClick = function () {};
	}

	if ( inline )
	{
		return <span style={style} className={classNames.join (' ')} onClick={onClick}>{text}</span>;
	}

	return <div style={style} className={classNames.join (' ')} onClick={onClick}>{text}</div>;
};


export default UIButton;
