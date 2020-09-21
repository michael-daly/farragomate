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

		this.state = { confirmPopup: '', selectedClient: '' };
	}

	confirmLeave ()
	{
		this.showConfirmation ('leave');
	}

	confirmKick ()
	{
		this.showConfirmation ('kick');
	}

	showConfirmation ( type )
	{
		this.setState ({ confirmPopup: type });
	}

	hideConfirmation ()
	{
		this.setState ({ confirmPopup: '', selectedClient: '' });
	}

	clickX ( id )
	{
		this.setState ({ selectedClient: id });
		this.confirmKick ();
	}

	clickKickClient ()
	{
		this.props.kickClient (this.state.selectedClient);
		this.hideConfirmation ();
	}

	render ()
	{
		const { id, info, clients } = this.props;

		const { screen }       = info;
		const { confirmPopup } = this.state;

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

		if ( confirmPopup !== '' )
		{
			let title = '';
			let body  = '';

			let onClickButton1 = null;
			let onClickButton2 = null;

			if ( confirmPopup === 'leave' )
			{
				title = 'Confirmation';
				body  = 'Leave this room?';

				onClickButton1 = this.hideConfirmation.bind (this);
				onClickButton2 = this.props.leaveRoom.bind (this);
			}
			else if ( confirmPopup === 'kick' )
			{
				title = 'Confirmation';
				body  = 'Kick player from this room?';

				onClickButton1 = this.hideConfirmation.bind (this);
				onClickButton2 = this.clickKickClient.bind (this);
			}

			popup =
			(
				<UIPopup
					title={title}
					numButtons={2}
					button1Text='No'
					button2Text='Yes'
					onClickButton1={onClickButton1}
					onClickButton2={onClickButton2}
				>
					{body}
				</UIPopup>
			);
		}

		return (
			<Fragment>
				<Topbar onClickLeave={this.confirmLeave.bind (this)} />

				<ClientList
					clients={clients}
					ownerID={info.ownerID}
					showX={id === info.ownerID}
					onClickX={this.clickX.bind (this)}
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
