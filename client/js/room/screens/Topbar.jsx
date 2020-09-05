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
		return (
			<div className='topbar'>
				<span>
					<UIButton
						style={{ borderWidth: '0.08em', color: '#FFBB88' }}
						className='chalk-small'
						text='<< Leave'
						onClick={this.props.leaveRoom}
					/>
				</span>

				<span style={{ paddingLeft: '3%', width: '33%', display: 'inline-block' }}>
					Time Left: {this.props.timeLeft}
				</span>

				<span style={{ width: '33%', display: 'inline-block' }}>
					Round {this.props.currRound + 1} of {this.props.numRounds}
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
	return { leaveRoom () { dispatch (leaveRoom ()); } };
};


export default connect (mapStateToProps, mapDispatchToProps) (Topbar);
