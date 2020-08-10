import React, { Component } from 'react';


const UIButton = ({ type, text, onClick, disabled = false, inline = true }) =>
{
	let classNames = ['button'];

	if ( type === 'magnet' )
	{
		classNames.push ('magnet');
	}
	else if ( type === 'chalk' )
	{
		classNames.push ('chalk');
	}

	classNames.push (disabled ? 'disabled' : 'enabled');

	if ( inline )
	{
		return <span className={classNames.join (' ')} onClick={onClick}>{text}</span>;
	}

	return <div className={classNames.join (' ')} onClick={onClick}>{text}</div>;
};


export default UIButton;
