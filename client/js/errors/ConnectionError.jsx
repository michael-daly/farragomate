import React, { Component } from 'react';

import { connect } from 'react-redux';


class ConnectionError extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		return (
			<div className='center-content'>
				<h1>Connection Lost</h1>

				<div className='center-content' style={{ width: '54%' }}>
					{this.props.errorMsg}
				</div>
			</div>
		);
	}
}


const mapStateToProps = ({ errors }) =>
{
	return { errorMsg: errors.socketError };
};

const mapDispatchToProps = dispatch =>
{
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (ConnectionError);
