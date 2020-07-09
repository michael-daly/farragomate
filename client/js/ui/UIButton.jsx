import React, { Component } from 'react';


const UIButton = ({ type, text, onClick }) =>
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

	return <span className={classNames} onClick={onClick}>{text}</span>;
};


export default UIButton;
