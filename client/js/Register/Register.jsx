import React, { Component } from 'react';

import { connect } from 'react-redux';

import TitleLogo from '#/ui/TitleLogo.jsx';
import UIFields  from '#/ui/UIFields.jsx';
import UIButton  from '#/ui/UIButton.jsx';

import fieldData from '~/clients/fieldData.js';

import { sendRequestPacket } from '#/socket/actions.js';


class Register extends Component
{
	constructor ( props )
	{
		super (props);

		this.state =
		{
			enablePlayBtn: false,
			sentInfo:      false,

			fields: {},
		};
	}

	onFieldChange ( field, value, fieldName, numRequired )
	{
		if ( this.state.sentInfo )
		{
			return;
		}

		this.setState ({ enablePlayBtn: numRequired <= 0, fields: { [fieldName]: value } });
	}

	onClickPlay ( event )
	{
		this.setState ({ enablePlayBtn: false, sentInfo: true });

		this.props.sendRegisterInfo (this.state.fields);
	}

	render ()
	{
		return (
			<div className='center-content'>
				<div>
					<TitleLogo />

					<UIFields
						className='button-menu'
						fieldData={fieldData}
						disabled={this.state.sentInfo}
						onChange={this.onFieldChange.bind (this)}
					/>

					<UIButton
						type='magnet'
						inline={true}
						text='Play >>'
						onClick={this.onClickPlay.bind (this)}
						disabled={!this.state.enablePlayBtn}
					/>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state =>
{
	return {};
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		sendRegisterInfo ( info )
		{
			dispatch (sendRequestPacket ('RegisterInfo', info));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (Register);
