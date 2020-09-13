import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import Topbar           from '#/screens/Topbar.jsx';
import SentenceCreation from '#/screens/SentenceCreation.jsx';
import Voting           from '#/screens/Voting.jsx';
import FinalScores      from '#/screens/FinalScores.jsx';


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
		else if ( screen === 'SentenceVoting' )
		{
			component = <Voting votingEnabled={true} />;
		}
		else if ( screen === 'VotingResults' )
		{
			component = <Voting votingEnabled={false} />;
		}
		else if ( screen === 'FinalScores' )
		{
			component = <FinalScores />;
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
