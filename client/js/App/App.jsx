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
		const { screen } = this.props;

		let component = '';

		if ( screen === 'MainMenu' )
		{
			component = <MainMenu />;
		}
		else
		{
			component = <div className='center-content'>Invalid screen: `{screen}`</div>;
		}

		return <div className='chalkboard'>{component}</div>;
	}
}


const mapStateToProps = props =>
{
	return { screen: props.global.screen };
};

const mapDispatchToProps = dispatch =>
{
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (App);
