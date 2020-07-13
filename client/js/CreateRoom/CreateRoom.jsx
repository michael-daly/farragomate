import React, { Component } from 'react';

import { connect } from 'react-redux';

import UIButton   from '#/ui/UIButton.jsx';
import UITextbox  from '#/ui/UITextbox.jsx';
import UIDropdown from '#/ui/UIDropdown.jsx';


class CreateRoom extends Component
{
	constructor ( props )
	{
		super (props);

		this.state = { value: 'Hello :)' };
	}

	render ()
	{
		const room = this;

		return (
			<div className='center-content'>
				<h1>Create a Room</h1>

				<div className='button-menu center-content'>

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
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (CreateRoom);
