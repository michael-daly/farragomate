import React, { Component } from 'react';

import UIButton   from '#/ui/UIButton.jsx';
import UIDropdown from '#/ui/UIDropdown.jsx';
import UITextbox  from '#/ui/UITextbox.jsx';


class UIFields extends Component
{
	render ()
	{
		const { props }     = this;
		const { fieldData } = props;

		const elementArr = [];

		for ( let fieldName in fieldData )
		{
			const { type, min, max, defaultValue, label } = fieldData[fieldName];

			let control;

			if ( type === 'string' )
			{
				control = <UITextbox maxLength={max} value={defaultValue} />;
			}
			else
			{
				const options = [];

				let selection = { label: defaultValue, value: defaultValue };

				for ( let i = min; i < max; i++ )
				{
					options.push ({ label: i, value: i });
				}

				control = <UIDropdown options={options} value={selection} />;
			}

			const element =
			(
				<div className='field'>
					<span style={{ display: 'inline' }}>
						<div className='field-label'>{label}:</div>
						{control}
					</span>
				</div>
			);

			elementArr.push (element);
		}

		return <div className='center-content fields-container'>{elementArr.map (el => el)}</div>;
	}	
}


export default UIFields;
