import React, { Component } from 'react';

import UIButton   from '#/ui/UIButton.jsx';
import UIDropdown from '#/ui/UIDropdown.jsx';
import UITextbox  from '#/ui/UITextbox.jsx';

import { stripNonASCII } from '~/util/sanitization.js';


class UIFields extends Component
{
	constructor ( props )
	{
		super (props);

		this.requiredFields = new Set ();
		this.state          = {};
	}

	componentDidMount ()
	{
		const { fieldData } = this.props;

		for ( let fieldName in fieldData )
		{
			const field = fieldData[fieldName];

			this.updateRequired (field, field.defaultValue, fieldName);
			this.setFieldValue (field, field.defaultValue, fieldName);
		}
	}

	setFieldValue ( field, value, fieldName )
	{
		if ( field.type === 'string' )
		{
			this.setState ({ [fieldName]: value });
		}
		else
		{
			this.setState ({ [fieldName]: { label: value, value } });
		}
	}

	updateRequired ( field, value, fieldName )
	{
		if ( field.required )
		{
			let size = value;

			if ( field.type === 'string' )
			{
				size = value.trim ().length;
			}

			if ( size < field.min || size > field.max )
			{
				this.requiredFields.add (fieldName);
			}
			else
			{
				this.requiredFields.delete (fieldName);
			}
		}
	}

	onFieldChange ( field, value, fieldName )
	{
		if ( field.type === 'string' )
		{
			value = stripNonASCII (value);
		}

		if ( this.props.onChange )
		{
			value = this.props.onChange (field, value, fieldName);
		}

		this.updateRequired (field, value, fieldName);

		return value;
	}

	render ()
	{
		const { state, requiredFields } = this;
		const { fieldData } = this.props;

		const self = this;

		return (
			<div className='center-content fields-container'>
			{
				Object.keys (fieldData).map (( fieldName, index ) =>
				{
					const field = fieldData[fieldName];

					const { type, min, max, label } = field;

					let control;

					if ( type === 'string' )
					{
						const onTextboxChange = event =>
						{
							const value = self.onFieldChange (field, event.target.value, fieldName);

							self.setFieldValue (field, value, fieldName);
						};

						control = <UITextbox
							maxLength={max}
							value={state[fieldName] || ''}
							isPassword={field.isPassword}
							highlight={requiredFields.has (fieldName)}
							onChange={onTextboxChange}
						/>;
					}
					else
					{
						const onDropdownChange = option =>
						{
							const value = self.onFieldChange (field, option.value, fieldName);

							self.setFieldValue (field, value, fieldName);
						};

						const options = [];

						for ( let i = min; i <= max; i++ )
						{
							options.push ({ label: i, value: i });
						}

						control = <UIDropdown
							options={options}
							value={state[fieldName] || ''}
							onChange={onDropdownChange}
							highlight={requiredFields.has (fieldName)}
						/>;
					}

					const element =
					(
						<div className='field' key={`${index} ${fieldName} ${min} ${max} ${label}`}>
							<span style={{ display: 'inline' }}>
								<div className='field-label'>{label}:</div>
								{control}
							</span>
						</div>
					);

					return element;
				})
			}
			</div>
		);
	}	
}


export default UIFields;
