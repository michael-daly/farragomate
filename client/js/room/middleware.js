const PacketManager = require ('~/packets/PacketManager.js');

const { has } = require ('~/util/has.js');

const { setScreen }       = require ('#/App/actions.js');
const { leaveRoom }       = require ('#/room/actions.js');
const { setLeaveRoomMsg } = require ('#/errors/actions.js');

const { sendRequestPacket, sendDataPacket } = require ('#/socket/actions.js');
const { sentenceToStr, sentenceToStrArr }   = require ('#/sentenceArray.js');

const
{
	clientLeave,

	enterScreen,
	leaveScreen,

	setDataSent,

	cacheClientNames,
}
= require ('#/room/actions.js');


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

			switch ( command )
			{
				case 'JoinRoom':
				{
					if ( body === register.id )
					{
						store.dispatch (setScreen ('MainGame'));
					}

					break;
				}

				case 'LeaveRoom':
				{
					store.dispatch (clientLeave (body));
					break;
				}

				case 'KickClient':
				{
					if ( body === register.id )
					{
						store.dispatch (leaveRoom ());
						store.dispatch (setLeaveRoomMsg ('You were kicked from the room.'));
					}

					break;
				}

				case 'DeleteRoom':
				{
					if ( room.info.id !== '' )
					{
						const roomMessage = 'The room was closed' + (body ? `: ${body}` : '.');

						store.dispatch (leaveRoom ());
						store.dispatch (setLeaveRoomMsg (roomMessage));
					}

					break;
				}

				case 'EnterScreen':
				{
					store.dispatch (enterScreen (payload.body));

					if ( body === 'SentenceVoting' )
					{
						store.dispatch (cacheClientNames (room.clients.list));
					}

					break;
				}

				case 'LeaveScreen':
				{
					store.dispatch (leaveScreen (payload.body));

					if ( body === 'SentenceCreation' && room.sentences.array.length > 0 )
					{
						store.dispatch (setDataSent (true));
						store.dispatch (sendRequestPacket ('SendSentence', room.sentences.array));
					}
					else if ( body === 'SentenceVoting' && room.sentences.vote !== '' )
					{
						store.dispatch (setDataSent (true));
						store.dispatch (sendRequestPacket ('CastVote', room.sentences.vote));
					}

					break;
				}

				case 'ClientSentences':
				{
					const { wordbanks } = state.room;
					const { body }      = payload;

					const sentences = {};

					for ( let authorID in body )
					{
						if ( authorID === register.id && room.info.screen === 'SentenceVoting' )
						{
							continue;
						}

						const sentence = body[authorID];

						sentences[authorID] =
						{
							...sentence,
							str: sentenceToStr (sentenceToStrArr (wordbanks, sentence.arr)),
						}
					}

					payload.body = sentences;

					break;
				}
			}

			break;
		}

		case 'REQUEST_ROOM_LIST':
		{
			store.dispatch (sendRequestPacket ('RoomList'));
			break;
		}

		case 'REQUEST_JOIN_ROOM':
		{
			store.dispatch (sendRequestPacket ('JoinRoom', payload));
			break;
		}

		case 'KICK_CLIENT':
		{
			store.dispatch (sendRequestPacket ('KickClient', payload));
			break;
		}

		case 'LEAVE_ROOM':
		{
			store.dispatch (setScreen ('MainMenu'));
			store.dispatch (sendDataPacket ('LeaveRoom'));

			break;
		}
	}

	return next (action);
};
