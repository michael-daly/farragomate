import React, { Component } from 'react';

import { connect } from 'react-redux';

import SentenceCreation from '#/screens/SentenceCreation.jsx';


class MainGame extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		const { screen } = this.props;

		let component = '';

		if ( screen === 'SentenceCreation' )
		{
			component = <SentenceCreation />;
		}
		else
		{
			component = <div className='center-content'>Invalid screen: `{screen}`</div>;
		}

		return component;
	}
}


const mapStateToProps = ({ room }) =>
{
	return { screen: room.info.screen };
};

const mapDispatchToProps = dispatch =>
{
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (MainGame);
