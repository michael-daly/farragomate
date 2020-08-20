import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import Wordbank from '#/screens/Wordbank.jsx';


class SentenceCreation extends Component
{
	constructor ( props )
	{
		super (props);
	}

	render ()
	{
		const { props }     = this;
		const { wordbanks } = props;

		return (
			<Fragment>
			{
				wordbanks.map (( words, index ) =>
				{
					return <Wordbank key={`words-${index}`} words={words} index={index} />;
				})
			}
			</Fragment>
		);
	}
}


const mapStateToProps = ({ room }) =>
{
	return { wordbanks: room.wordbanks };
};

const mapDispatchToProps = dispatch =>
{
	return {};
};


export default connect (mapStateToProps, mapDispatchToProps) (SentenceCreation);
