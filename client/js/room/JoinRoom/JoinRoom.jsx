import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import UITable  from '#/ui/table/UITable.jsx';
import UIButton from '#/ui/UIButton.jsx';

import { setScreen }    from '#/App/actions.js';
import { getTimeSince } from '~/util/timestamps.js';

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

		this.state = { enableRefreshBtn: false, };
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
		if ( rowData.hasPassword )
		{
			// TODO: Handle passworded servers
		}
		else
		{
			this.props.requestJoinRoom (roomID);
		}
	}

	render ()
	{
		const { props, state }       = this;
		const { roomList, errorMsg } = props;

		const owners    = [];
		const rowValues = [];
		const highlight = [];

		const onClick = ( rowIndex, event ) =>
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

		return (
			<Fragment>
				<UITable
					columnInfo={columnInfo}
					rowValues={state.enableRefreshBtn ? rowValues : []}
					selected={highlight}
					tableSize='large'
					headerText='Join a Room'
					emptyMessage={state.enableRefreshBtn ? 'No rooms are available!' : 'Loading...'}
					onClick={onClick.bind (this)}
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
	return { ...room.list, errorMsg: errors.roomListError };
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

		gotoMainMenu ()
		{
			dispatch (setScreen ('MainMenu'));
		},
	};
};


export default connect (mapStateToProps, mapDispatchToProps) (JoinRoom);
