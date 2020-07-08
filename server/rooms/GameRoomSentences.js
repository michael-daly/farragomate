const GameWordbank = require ('$/wordbanks/GameWordbank.js');
const words        = require ('$/config/words.js');

const { isValidIndex } = require ('~/util/arrays.js');


class GameRoomSentences
{
	constructor ()
	{
		this.sentences = {};
		this.wordbanks =
		[
			new GameWordbank ('adjective'),
			new GameWordbank ('noun'),
			new GameWordbank ('verb'),
			[ ...words.grammar ],
			[ ...words.pronouns ],
			[ ...words.misc ],
		];

		this.isDeleted = false;
	}

	delete ()
	{
		if ( this.isDeleted )
		{
			return;
		}

		this.wordbanks[0].delete ();
		this.wordbanks[1].delete ();
		this.wordbanks[2].delete ();

		delete this.sentences;
		delete this.wordbanks;

		this.isDeleted = true;
	}

	/**
	 * @param {string}   clientID
	 * @param {Object[]} sentenceArr
	 */
	addSentence ( clientID, sentenceArr )
	{
		if ( !has (this.sentences, clientID) )
		{
			this.sentences[clientID] = { votes: 0, arr: sentenceArr };
		}
	}

	clearSentences ()
	{
		this.sentences = {};
	}

	getSentences ()
	{
		return this.sentences;
	}

	getWordbanks ()
	{
		const { wordbanks } = this;
		const { length }    = wordbanks;

		const arr = [];

		for ( let i = 0; i < length; i++ )
		{
			const wordbank = wordbanks[i];

			if ( Array.isArray (wordbank) )
			{
				arr.push (wordbank);
			}
			else
			{
				arr.push (wordbank.toJSON ());
			}
		}

		return arr;
	}

	async fetchWords ()
	{
		const { wordbanks } = this;

		const promises =
		[
			wordbanks[0].fetchWords (),
			wordbanks[1].fetchWords (),
			wordbanks[2].fetchWords (),
		];

		return Promise.all (promises);
	}
}


module.exports = GameRoomSentences;
