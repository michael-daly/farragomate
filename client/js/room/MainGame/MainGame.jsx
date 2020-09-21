import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import Topbar           from '#/MainGame/Topbar.jsx';
import ClientList       from '#/MainGame/ClientList.jsx';
import SentenceCreation from '#/screens/SentenceCreation.jsx';
import Voting           from '#/screens/Voting.jsx';
import FinalScores      from '#/screens/FinalScores.jsx';

import UIPopup from '#/ui/popup/UIPopup.jsx';

import { kickClient, leaveRoom } from '#/room/actions.js';


class MainGame extends Component
{
	constructor ( props )
	{
		super (props);

		this.state = { confirmPopup: false };
	}

	showConfirmation ()
	{
		this.setState ({ confirmPopup: true });
	}

	hideConfirmation ()
	{
		this.setState ({ confirmPopup: false });
	}

	render ()
	{
		const { id, info, clients } = this.props;

		const { screen } = info;

		let component = '';

		switch ( screen )
		{
			case 'SentenceCreation':
			case null:
			{
				component = <SentenceCreation />;
				break;
			}

			case 'SentenceVoting':
			{
				component = <Voting votingEnabled={true} />;
				break;
			}

			case 'VotingResults':
			{
				component = <Voting votingEnabled={false} />;
				break;
			}

			case 'FinalScores':
			{
				component = <FinalScores />;
				break;
			}

			default:
			{
				component = <div className='center-content'>Invalid screen: `{screen}`</div>;
				break;
			}
		}

		let popup = '';

		if ( this.state.confirmPopup )
		{
			popup =
			(
				<UIPopup
					title='Leave the room?'
					numButtons={2}
					button1Text='No'
					button2Text='Yes'
					onClickButton1={this.hideConfirmation.bind (this)}
					onClickButton2={this.props.leaveRoom.bind (this)}
				>
					Do you want to leave this room?
				</UIPopup>
			);
		}

		return (
			<Fragment>
				<Topbar onClickLeave={this.showConfirmation.bind (this)} />

				<ClientList
					clients={clients}
					ownerID={info.ownerID}
					showX={id === info.ownerID}
					onClickX={this.props.kickClient.bind (this)}
				/>

				{popup}
				{component}
			</Fragment>
		);
	}
}


const mapStateToProps = ({ register, room }) =>
{
	return { id: register.id, info: { ...room.info }, clients: room.clients.list };
};

const mapDispatchToProps = dispatch =>
{
	return {
		kickClient ( ...args )
		{
			dispatch (kickClient (...args));
		},

		leaveRoom ()
		{
			dispatch (leaveRoom ());
		},
	};
};


export default connect (mapStateToProps, mapDispatchToProps) (MainGame);
