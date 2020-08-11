const dropdownStyles = ( highlight = false ) =>
{
	const boxColor = highlight ? '#FF5154' : '#AAFF66';

	const styles =
	{
		control: provided =>
		({
			...provided,

			background: 'none',
			outline:    'none',
			boxShadow:  'none',

			color:       boxColor,
			borderColor: `${boxColor} !important`,

			border:       '0.1em dashed',
			borderRadius: '0px',

			padding:      '0.3em',
			paddingLeft:  '0.75em',
			paddingRight: '0.75em',

			margin: '0.15em',

			width:  '7.5vw',
			height: '3.5vw',

			'&:hover':
			{
				backgroundColor: 'rgba(0, 0, 0, 0.1)',
			},
		}),

		menu: provided =>
		({
			position: 'absolute',

			width:  '7vw',
			height: '3.5vw',
		}),

		option: provided =>
		({
			...provided,

			color: '#AAFF66',

			textAlign:  'left',
			background: 'none',

			overflow: 'hidden',

			background: 'rgba(0, 0, 0, 0.15)',

			'&:hover':
			{
				backgroundColor: 'rgba(0, 0, 0, 0.25)',
			},
		}),

		singleValue: provided =>
		({
			color:    '#CCFF77',
			overflow: 'hidden',
		}),

		dropdownIndicator () {},
		indicatorSeparator () {},
	};

	return styles;
};


export default dropdownStyles;
