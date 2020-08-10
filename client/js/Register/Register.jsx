import React, { Component } from 'react';

import { connect } from 'react-redux';

import TitleLogo from '#/ui/TitleLogo.jsx';
import UIFields  from '#/ui/UIFields.jsx';
import UIButton  from '#/ui/UIButton.jsx';

import fieldData from '~/clients/fieldData.js';


class Register extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		return (
			<div className='center-content'>
				<div>
					<TitleLogo />

					<UIFields className='button-menu' fieldData={fieldData} />
					<UIButton type='magnet' inline={true} text='Play >>' />
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
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (Register);
