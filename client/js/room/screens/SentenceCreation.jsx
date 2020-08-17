import React, { Component } from 'react';

import { connect } from 'react-redux';


class SentenceCreation extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		return 'SentenceCreation';
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


export default connect (mapStateToProps, mapDispatchToProps) (SentenceCreation);
