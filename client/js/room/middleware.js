const PacketManager = require ('~/packets/PacketManager.js');

const { has } = require ('~/util/has.js');

const { sendRequestPacket } = require ('#/socket/actions.js');


let socket        = null;
let packetManager = null;


module.exports = store => next => action =>
{
	const state = store.getState ();

	const { payload } = action;
	const { room }    = state;

	switch ( action.type )
	{
		case 'RECV_DATA_PACKET':
		{
			const { command, body } = payload;

			if ( command === 'LeaveScreen' )
			{
				if ( body === 'SentenceCreation' )
				{
					store.dispatch (sendRequestPacket ('SendSentence', room.sentences.array));
				}
				else if ( body === 'SentenceVoting' )
				{
					store.dispatch (sendRequestPacket ('CastVote', room.sentences.vote));
				}
			}

			break;
		}
	}

	return next (action);
};
