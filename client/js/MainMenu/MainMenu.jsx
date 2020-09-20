import React, { Component } from 'react';

import { connect } from 'react-redux';

import TitleLogo from '#/ui/TitleLogo.jsx';
import UIPopup   from '#/ui/popup/UIPopup.jsx';
import UIButton  from '#/ui/UIButton.jsx';

import { setScreen }     from '#/App/actions.js';
import { clearErrorMsg } from '#/errors/actions.js';


class MainMenu extends Component
{
	constructor ( props )
	{
		super (props);
	}

	createRoom ()
	{
		this.props.setScreen ('CreateRoom');
	}

	joinRoom ()
	{
		this.props.setScreen ('JoinRoom');
	}

	changeName ()
	{
		this.props.setScreen ('Register');
	}

	render ()
	{
		const { props } = this;

		let popup = '';

		if ( props.leaveRoomMsg !== '' )
		{
			popup =
			(
				<UIPopup title='Disconnected' onClickButton1={props.clearMessage.bind (this)}>
					{props.leaveRoomMsg}
				</UIPopup>
			);
		}

		const createRoom = this.createRoom.bind (this);
		const joinRoom   = this.joinRoom.bind (this);
		const changeName = this.changeName.bind (this);

		return (
			<div className='center-content'>
				<TitleLogo />

				{popup}

				<div className='button-menu center-content'>
					<UIButton className='magnet' inline={false} text='Create Room' onClick={createRoom} />
					<UIButton className='magnet' inline={false} text='Join Room' onClick={joinRoom} />

					<div style={{ marginTop: '25%' }}>
						<UIButton className='chalk' inline={false} text='Change Name' onClick={changeName} />
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = ({ errors }) =>
{
	return { leaveRoomMsg: errors.leaveRoomMsg };
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		setScreen ( screen )
		{
			dispatch (setScreen (screen));
		},

		clearMessage ()
		{
			dispatch (clearErrorMsg ('leaveRoomMsg'));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (MainMenu);
