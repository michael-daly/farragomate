const chalk =
{
	background: 'none',
	outline:    'none',
	boxShadow:  'none',

	color:       '#AAFF66',
	borderColor: '#AAFF66 !important',  // I hate doing this, but it must be done.

	border:       '0.1em dashed',
	borderRadius: '0px',

	padding:      '0.3em',
	paddingLeft:  '0.75em',
	paddingRight: '0.75em',
};


const dropdownStyles =
{
	control: provided =>
	({
		...provided,
		...chalk,

		margin: '0.15em',

		width:  '7vw',
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

		background: 'rgba(0, 0, 0, 0.1)',

		'&:hover':
		{
			backgroundColor: 'rgba(0, 0, 0, 0.2)',
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


export default dropdownStyles;
