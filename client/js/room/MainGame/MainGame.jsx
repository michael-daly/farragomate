import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import Topbar           from '#/screens/Topbar.jsx';
import SentenceCreation from '#/screens/SentenceCreation.jsx';

import UITable from '#/ui/UITable.jsx';


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

		if ( screen === 'SentenceCreation' || screen === null )
		{
			component = <SentenceCreation />;
		}
		else
		{
			component = <div className='center-content'>Invalid screen: `{screen}`</div>;
		}

		return <Fragment><Topbar />{component}</Fragment>;
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
