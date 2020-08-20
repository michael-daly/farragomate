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
			enablePlayBtn: props.info.displayName !== '',
			sentInfo:      false,

			fields: { ...props.info },
		};
	}

	onFieldChange ( field, value, fieldName, numRequired )
	{
		this.setState (
		{
			enablePlayBtn: numRequired <= 0,
			fields:
			{
				...this.state.fields,
				[fieldName]: value,
			},
		});
	}

	onClickPlay ( event )
	{
		this.setState ({ enablePlayBtn: false, sentInfo: true });
		this.props.sendRegisterInfo (this.state.fields);
	}

	render ()
	{
		const { props }        = this;
		const { errorMessage } = props;

		return (
			<div className='center-content'>
				<div>
					<TitleLogo />

					<UIFields
						className='button-menu'
						fieldData={fieldData}
						initialValues={{ displayName: props.info.displayName }}
						disabled={this.state.sentInfo && errorMessage === ''}
						style={{ container: { marginBottom: '0px' } }}
						onChange={this.onFieldChange.bind (this)}
					/>

					<div className='error-message' style={{ marginBottom: '2vw' }}>
						{errorMessage}
					</div>

					<div>
						<UIButton
							className='magnet'
							text='Play >>'
							inline={true}
							onClick={this.onClickPlay.bind (this)}
							disabled={!this.state.enablePlayBtn && errorMessage === ''}
						/>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state =>
{
	return { info: { ...state.register }, errorMessage: state.errors.registerError };
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
