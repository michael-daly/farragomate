const PacketManager = require ('~/packets/PacketManager.js');

const { has } = require ('~/util/has.js');

const { sendRequestPacket }               = require ('#/socket/actions.js');
const { sentenceToStr, sentenceToStrArr } = require ('#/sentenceArray.js');


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
	}

	return next (action);
};
