import React, { Component } from 'react';

import { connect } from 'react-redux';

import Register   from '#/Register/Register.jsx';
import MainMenu   from '#/MainMenu/MainMenu.jsx';
import CreateRoom from '#/CreateRoom/CreateRoom.jsx';
import JoinRoom   from '#/JoinRoom/JoinRoom.jsx';
import MainGame   from '#/MainGame/MainGame.jsx';

import { socketPort }      from '~/config.js';
import { useSecureSocket } from '#/config.js';
import { socketConnect }   from '#/socket/actions.js';


class App extends Component
{
	constructor ( props )
	{
		super (props);
	}

	componentDidMount ()
	{
		if ( this.props.socketState !== 'CLOSED' )
		{
			return;
		}

		const protocol = useSecureSocket ? 'wss://' : 'ws://';

		this.props.socketConnect (protocol + window.location.hostname + ':' + socketPort);
	}

	render ()
	{
		const { screen } = this.props;

		let component = '';

		if ( screen === 'Register' )
		{
			component = <Register />;
		}
		else if ( screen === 'MainMenu' )
		{
			component = <MainMenu />;
		}
		else if ( screen === 'CreateRoom' )
		{
			component = <CreateRoom />;
		}
		else if ( screen === 'JoinRoom' )
		{
			component = <JoinRoom />;
		}
		else if ( screen === 'MainGame' )
		{
			component = <MainGame />;
		}
		else
		{
			component = <div className='center-content'>Invalid screen: `{screen}`</div>;
		}

		return <div className='chalkboard'>{component}</div>;
	}
}


const mapStateToProps = ({ app }) =>
{
	return { ...app };
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		socketConnect ( url )
		{
			dispatch (socketConnect (url));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (App);
