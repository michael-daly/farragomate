import React, { Component } from 'react';

import { connect } from 'react-redux';

import UIFields from '#/ui/UIFields.jsx';
import UIButton from '#/ui/UIButton.jsx';

import fieldData from '~/rooms/fieldData.js';

import { setScreen } from '#/App/actions.js';


class CreateRoom extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		return (
			<div className='center-content'>
				<h1>Create a Room</h1>

				<UIFields fieldData={fieldData} />

				<div className='center-content' style={{ width: '54%' }}>
					<span className='left' onClick={this.props.mainMenu}>
						<UIButton type='magnet' text='<< Back' />
					</span>

					<span className='right'>
						<UIButton type='magnet' text='Create Room >>' />
					</span>
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
		mainMenu ()
		{
			dispatch (setScreen ('MainMenu'));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (CreateRoom);
