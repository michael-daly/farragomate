import React, { Component } from 'react';

import Select from 'react-select';

import dropdownStyles from '#/ui/dropdownStyles.js';


const UIDropdown = ({ options, value, placeholder, onChange }) =>
(
	<Select
		classNamePrefix='dropdown'
		styles={dropdownStyles}
		isSearchable={false}
		options={options}
		value={value}
		placeholder={placeholder || ''}
		onChange={onChange}
	/>
);


export default UIDropdown;
