import React, { Component } from 'react';

import { connect } from 'react-redux';


class App extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		return <div>Hello! :)</div>;
	}
}


const mapStateToProps = ({ global, popup, tempCanvas }) =>
{
	return {};
};

const mapDispatchToProps = dispatch =>
{
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (App);
