const PacketManager = require ('~/packets/PacketManager.js');

const { has } = require ('~/util/has.js');


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
			if ( payload.command === 'RoomInfo' && room.info.screen === 'SentenceCreation' )
			{
				if ( payload.body.timeLeft <= 0 )
				{
					store.dispatch (
					{
						type: 'SEND_REQUEST_PACKET',

						payload:
						{
							command: 'SendSentence',
							body:    room.sentences.sentenceArray,
						},
					});
				}
			}

			break;
		}
	}

	return next (action);
};