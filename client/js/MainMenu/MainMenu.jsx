import React, { Component } from 'react';

import { connect } from 'react-redux';

import TitleLogo from '#/ui/TitleLogo.jsx';
import UIButton  from '#/ui/UIButton.jsx';

import { setScreen } from '#/App/actions.js';


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

	render ()
	{
		const createRoom = this.createRoom.bind (this);

		return (
			<div className='center-content'>
				<TitleLogo />

				<div className='button-menu center-content'>
					<UIButton type='magnet' inline={false} text='Create Room' onClick={createRoom} />
					<UIButton type='magnet' inline={false} text='Join Room' />

					<div style={{ marginTop: '25%' }}>
						<UIButton type='chalk' inline={false} text='Change Name' />
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = () =>
{
	return {};
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		setScreen ( screen )
		{
			dispatch (setScreen (screen));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (MainMenu);
