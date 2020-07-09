import React, { Component } from 'react';


const UIButton = ({ type, text, onClick, inline = true }) =>
{
	let classNames = 'button ';

	if ( type === 'magnet' )
	{
		classNames += 'magnet';
	}
	else if ( type === 'chalk' )
	{
		classNames += 'chalk';
	}

	if ( inline )
	{
		return <span className={classNames} onClick={onClick}>{text}</span>;
	}

	return <div className={classNames} onClick={onClick}>{text}</div>;
};


export default UIButton;
