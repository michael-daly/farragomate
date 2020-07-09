import React, { Component } from 'react';

import { connect } from 'react-redux';

import MainMenu from '#/MainMenu/MainMenu.jsx';


class App extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		return (
			<div className='chalkboard'>
				<MainMenu />
			</div>
		);
	}
}


const mapStateToProps = ({ global, popup, tempCanvas }) =>
{
	return {};
};

const mapDispatchToProps = dispatch =>
{
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (App);
