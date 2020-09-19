import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import UIPopup       from '#/ui/popup/UIPopup.jsx';
import UITable       from '#/ui/table/UITable.jsx';
import UIButton      from '#/ui/UIButton.jsx';
import PasswordPopup from '#/ui/popup/PasswordPopup.jsx';

import { setScreen }     from '#/App/actions.js';
import { cancelRequest } from '#/socket/actions.js';
import { clearErrorMsg } from '#/errors/actions.js';
import { getTimeSince }  from '~/util/timestamps.js';

import { requestRoomList, requestJoinRoom } from '#/room/actions.js';

import { ROOM_LIST_TIMEOUT } from '~/constants.js';


const columnInfo =
[
	{ label: 'Owner',      size: 26 },
	{ label: 'Title',      size: 32 },
	{ label: 'Players',    size: 5 },
	{ label: 'Time Limit', size: 7 },
	{ label: 'Round',      size: 5 },
	{ label: 'Password?',  size: 3 },
];

class JoinRoom extends Component
{
	constructor ( props )
	{
		super (props);

		this.buttonTimeout  = 0;
		this.requestTimeout = 0;

		this.state =
		{
			enableRefreshBtn: false,
			passwordPrompt:   false,
			selectedRoom:     '',
			roomPassword:     '',
		};
	}

	componentDidMount ()
	{
		if ( getTimeSince (this.props.lastRequestTime) > ROOM_LIST_TIMEOUT )
		{
			this.props.requestRoomList ();
		}
		else
		{
			this.requestTimeout = setTimeout (() =>
			{
				this.props.requestRoomList ();
			},
			Math.max (0, ROOM_LIST_TIMEOUT - getTimeSince (this.props.lastRequestTime)));
		}

		this.refreshTimeout ();
	}

	componentWillUnmount ()
	{
		clearTimeout (this.buttonTimeout);
		clearTimeout (this.requestTimeout);
	}

	refreshTimeout ()
	{
		this.setState ({ enableRefreshBtn: false });

		this.buttonTimeout = setTimeout (() =>
		{
			this.setState ({ enableRefreshBtn: true });
		},
		ROOM_LIST_TIMEOUT);
	}

	clickRefresh ()
	{
		this.props.requestRoomList ();
		this.refreshTimeout ();
	}

	clickRoom ( roomID, rowData )
	{
		this.setState ({ selectedRoom: roomID }, () =>
		{
			if ( rowData.hasPassword )
			{
				this.showPrompt ();
			}
			else
			{
				this.joinRoom ();
			}
		});
	}

	showPrompt ()
	{
		this.setState ({ passwordPrompt: true, roomPassword: '' });
	}

	hidePrompt ()
	{
		this.setState ({ passwordPrompt: false, roomPassword: '', selectedRoom: '' });
	}

	joinRoom ()
	{
		this.props.requestJoinRoom (this.state.selectedRoom, this.state.roomPassword);
		this.hidePrompt ();
	}

	cancelJoinRoom ()
	{
		this.props.cancelRequest ('REQUEST_JOIN_ROOM');
	}

	onChangePassword ( event )
	{
		this.setState ({ roomPassword: event.target.value });
	}

	render ()
	{
		const { props, state }       = this;
		const { roomList, errorMsg } = props;

		const owners    = [];
		const rowValues = [];
		const highlight = [];

		const onClickRoom = ( rowIndex, event ) =>
		{
			const roomID = owners[rowIndex];

			this.clickRoom (roomID, roomList[roomID]);
		};

		for ( let roomID in roomList )
		{
			const roomData = roomList[roomID];

			if ( roomData.hasPassword )
			{
				highlight.push (rowValues.length);
			}

			owners.push (roomID);

			rowValues.push (
			[
				roomData.ownerName,
				roomData.title,

				`${roomData.numClients}/${roomData.maxClients}`,
				`${roomData.timeLimit}s`,
				`${roomData.numRounds + 1}/${roomData.maxRounds}`,

				roomData.hasPassword ? 'X' : '',
			]);
		}

		let popup = '';

		if ( props.errorMsg !== '' )
		{
			popup =
			(
				<UIPopup title='Error' onClickButton1={props.clearErrorMsg.bind (this)}>
					{props.errorMsg}
				</UIPopup>
			);
		}
		else if ( props.isJoiningRoom )
		{
			popup =
			(
				<UIPopup
					title='Joining Room'
					button1Text='Cancel'
					onClickButton1={this.cancelJoinRoom.bind (this)}
				>
					Attempting to join room...
				</UIPopup>
			);
		}
		else if ( state.passwordPrompt )
		{
			popup = <PasswordPopup
				value={state.roomPassword}
				onClickCancel={this.hidePrompt.bind (this)}
				onClickJoin={this.joinRoom.bind (this)}
				onChange={this.onChangePassword.bind (this)}
			/>;
		}

		return (
			<Fragment>
				{popup}

				<UITable
					columnInfo={columnInfo}
					rowValues={state.enableRefreshBtn ? rowValues : []}
					selected={highlight}
					tableSize='large'
					headerText='Join a Room'
					emptyMessage={state.enableRefreshBtn ? 'No rooms are available!' : 'Loading...'}
					onClick={onClickRoom.bind (this)}
				/>

				<div className='center-content' style={{ width: '54%' }}>
					<span className='left' onClick={props.gotoMainMenu}>
						<UIButton className='magnet' text='<< Back' />
					</span>

					<span className='right'>
						<UIButton
							className='magnet'
							text='Refresh'
							inline={true}
							onClick={this.clickRefresh.bind (this)}
							disabled={!state.enableRefreshBtn}
						/>
					</span>
				</div>
			</Fragment>
		);
	}
}


const mapStateToProps = ({ room, errors }) =>
{
	return { ...room.list, errorMsg: errors.joinRoomError };
};

const mapDispatchToProps = dispatch =>
{
	return {
		requestRoomList ()
		{
			dispatch (requestRoomList ());
		},

		requestJoinRoom ( ...args )
		{
			dispatch (requestJoinRoom (...args));
		},

		cancelRequest ( ...args )
		{
			dispatch (cancelRequest (...args));
		},

		clearErrorMsg ()
		{
			dispatch (clearErrorMsg ('joinRoomError'));
		},

		gotoMainMenu ()
		{
			dispatch (setScreen ('MainMenu'));
		},
	};
};


export default connect (mapStateToProps, mapDispatchToProps) (JoinRoom);
