import React, { Component } from 'react';

import { connect } from 'react-redux';

import UIButton from '#/ui/UIButton.jsx';
import UIFields from '#/ui/UIFields.jsx';

import fieldData from '~/rooms/fieldData.js';


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
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (CreateRoom);
