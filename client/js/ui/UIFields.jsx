import React, { Component } from 'react';

import UIButton   from '#/ui/UIButton.jsx';
import UIDropdown from '#/ui/UIDropdown.jsx';
import UITextbox  from '#/ui/UITextbox.jsx';


class UIFields extends Component
{
	constructor ( props )
	{
		super (props);
		this.state = {};
	}

	render ()
	{
		const { fieldData, onChange = () => {} } = this.props;

		const fields =
		(
			<div className='center-content fields-container'>
			{
				Object.keys (fieldData).map (( fieldName, index ) =>
				{
					const { type, min, max, defaultValue, label } = fieldData[fieldName];

					const onControlChange = event => onChange (event, fieldName, fieldData);

					let control;

					if ( type === 'string' )
					{
						control = <UITextbox
							maxLength={max}
							value={defaultValue}
							onChange={onControlChange}
						/>;
					}
					else
					{
						const options = [];

						let selection = { label: defaultValue, value: defaultValue };

						for ( let i = min; i <= max; i++ )
						{
							options.push ({ label: i, value: i });
						}

						control = <UIDropdown
							options={options}
							value={selection}
							onChange={onControlChange}
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

		return fields;
	}	
}


export default UIFields;
