import React, { Component } from 'react';

import { connect } from 'react-redux';

import TitleLogo from '#/ui/TitleLogo.jsx';
import UIButton  from '#/ui/UIButton.jsx';


class MainMenu extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		return (
			<div className='center-content'>
				<TitleLogo />

				<div className='main-menu center-content'>
					<UIButton type='magnet' inline={false} text='Create Room' />
					<UIButton type='magnet' inline={false} text='Join Room' />

					<div style={{ marginTop: '25%' }}>
						<UIButton type='magnet' inline={false} text='Change Name' />
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
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (MainMenu);
