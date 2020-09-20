const PacketManager = require ('~/packets/PacketManager.js');

const { has } = require ('~/util/has.js');

const { setScreen }         = require ('#/App/actions.js');
const { sendRequestPacket } = require ('#/socket/actions.js');
const { setLeaveRoomMsg }   = require ('#/errors/actions.js');

const { sentenceToStr, sentenceToStrArr } = require ('#/sentenceArray.js');


let socket        = null;
let packetManager = null;


module.exports = store => next => action =>
{
	const state = store.getState ();

	const { payload }        = action;
	const { room, register } = state;

	switch ( action.type )
	{
		case 'RECV_DATA_PACKET':
		{
			const { command, body } = payload;

			if ( command === 'JoinRoom' && body === register.id )
			{
				store.dispatch (setScreen ('MainGame'));
			}
			else if ( command === 'KickClient' && body === register.id )
			{
				store.dispatch (setLeaveRoomMsg ('You were kicked from the room.'));
			}
			else if ( command === 'DeleteRoom' && room.info.id !== '' )
			{
				store.dispatch (setLeaveRoomMsg ('The room was closed.'));
			}
			else if ( command === 'LeaveScreen' )
			{
				if ( body === 'SentenceCreation' && room.sentences.array.length > 0 )
				{
					store.dispatch (sendRequestPacket ('SendSentence', room.sentences.array));
				}
				else if ( body === 'SentenceVoting' && room.sentences.vote !== '' )
				{
					store.dispatch (sendRequestPacket ('CastVote', room.sentences.vote));
				}
			}
			else if ( command === 'ClientSentences' )
			{
				const { wordbanks } = state.room;
				const { body }      = payload;

				const sentences = {};

				for ( let authorID in body )
				{
					const sentence = body[authorID];

					sentences[authorID] =
					{
						...sentence,
						str: sentenceToStr (sentenceToStrArr (wordbanks, sentence.arr)),
					}
				}

				payload.body = sentences;
			}

			break;
		}

		case 'REQUEST_JOIN_ROOM':
		{
			store.dispatch (sendRequestPacket ('JoinRoom', payload));
			break;
		}
	}

	return next (action);
};
