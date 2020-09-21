import React from 'react';

import UIButton from '#/ui/UIButton.jsx';


const ClientList = ({ clients, ownerID, showX = false, onClickX = () => {} }) =>
{
	const clientIDs = Object.keys (clients);

	const { length } = clientIDs;

	return (
		<div className='client-list'>
		{
			clientIDs.map (( id, index ) =>
			{
				const { displayName } = clients[id];

				const className = `client-list-name ${index >= length - 1 ? 'no-border' : ''}`;

				const kickButton = showX && id !== ownerID ?
					<UIButton
						style={{ color: '#FF5154', paddingLeft: '0vw', paddingRight: '1vw' }}
						text='X'
						onClick={event => onClickX (id, event)}
					/> : '';

				return (
					<span key={`client-list-${index}-${id}-${displayName}`} className={className}>
						{kickButton}
						{displayName}
					</span>
				);
			})
		}
		</div>
	);
};


export default ClientList;
