import React, { Component } from 'react';

import { connect } from 'react-redux';

import UIFields from '#/ui/UIFields.jsx';
import UIButton from '#/ui/UIButton.jsx';

import fieldData from '~/rooms/fieldData.js';

import { setScreen }         from '#/App/actions.js';
import { sendRequestPacket } from '#/socket/actions.js';


class CreateRoom extends Component
{
	constructor ( props )
	{
		super (props);

		this.state =
		{
			enableCreateBtn: props.info.displayName !== '',
			sentInfo:        false,

			fields: { ...props.info },
		};
	}

	onFieldChange ( field, value, fieldName, numRequired )
	{
		this.setState (
		{
			enableCreateBtn: numRequired <= 0,
			fields:
			{
				...this.state.fields,
				[fieldName]: value,
			},
		});
	}

	onClickCreate ( event )
	{
		this.setState ({ enableCreateBtn: false, sentInfo: true });
		this.props.sendRoomInfo (this.state.fields);
	}

	render ()
	{
		const { props }        = this;
		const { errorMessage } = props;

		return (
			<div className='center-content'>
				<h1>Create a Room</h1>

				<UIFields
					className='button-menu'
					fieldData={fieldData}
					initialValues={{ ...props.info }}
					disabled={this.state.sentInfo && errorMessage === ''}
					style={{ container: { marginBottom: '0px' } }}
					onChange={this.onFieldChange.bind (this)}
				/>

				<div className='error-message' style={{ marginBottom: '2vw' }}>
					{errorMessage}
				</div>

				<div className='center-content' style={{ width: '54%' }}>
					<span className='left' onClick={props.gotoMainMenu}>
						<UIButton type='magnet' text='<< Back' />
					</span>

					<span className='right'>
						<UIButton
							type='magnet'
							text='Create Room >>'
							inline={true}
							onClick={this.onClickCreate.bind (this)}
							disabled={!this.state.enableCreateBtn && errorMessage === ''}
						/>
					</span>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state =>
{
	return { info: { ...state.room }, errorMessage: state.errors.createRoomError };
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		gotoMainMenu ()
		{
			dispatch (setScreen ('MainMenu'));
		},

		sendRoomInfo ( info )
		{
			dispatch (sendRequestPacket ('CreateRoom', info));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (CreateRoom);