import React, { Component } from 'react';

import Select from 'react-select';

import dropdownStyles from '#/ui/dropdownStyles.js';


const UIDropdown = ({ options, value, onChange, placeholder = '', highlight = false }) =>
(
	<Select
		classNamePrefix='dropdown'
		styles={dropdownStyles (highlight)}
		isSearchable={false}
		options={options}
		value={value}
		placeholder={placeholder}
		onChange={onChange}
	/>
);


export default UIDropdown;
