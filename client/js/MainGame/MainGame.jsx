import React, { Component } from 'react';

import { connect } from 'react-redux';


class MainGame extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		return 'MainGame';
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


export default connect (mapStateToProps, mapDispatchToProps) (MainGame);
