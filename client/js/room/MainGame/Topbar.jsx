import React, { Component } from 'react';

import { connect } from 'react-redux';

import UIButton from '#/ui/UIButton.jsx';

import { leaveRoom } from '#/room/actions.js';


class Topbar extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		const { props } = this;

		return (
			<div className='topbar'>
				<span>
					<UIButton
						style={{ borderWidth: '0.08em', color: '#FFBB88' }}
						className='chalk-small'
						text='<< Leave'
						onClick={props.onClickLeave}
					/>
				</span>

				<span style={{ paddingLeft: '3%', width: '33%', display: 'inline-block' }}>
					Time Left: {props.timeLeft}
				</span>

				<span style={{ width: '33%', display: 'inline-block' }}>
					Round {props.numRounds + 1} of {props.maxRounds}
				</span>
			</div>
		);
	}
}


const mapStateToProps = ({ room }) =>
{
	return { ...room.info };
};

const mapDispatchToProps = dispatch =>
{
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (Topbar);
