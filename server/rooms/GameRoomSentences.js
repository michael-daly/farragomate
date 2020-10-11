const GameWordbank  = require ('$/wordbanks/GameWordbank.js');
const FixedWordbank = require ('$/wordbanks/FixedWordbank.js');

const words = require ('$/config/words.js');

const { has }          = require ('~/util/has.js');
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

			new FixedWordbank (words.grammar.slice ()),
			new FixedWordbank (words.pronouns.slice ()),
			new FixedWordbank (words.misc.slice ()),
		];

		this.isDeleted = false;
	}

	delete ()
	{
		if ( this.isDeleted )
		{
			return;
		}

		const { wordbanks } = this;
		const { length }    = wordbanks;

		for ( let i = 0; i < length; i++ )
		{
			wordbanks[i].delete ();
		}

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
		this.sentences[clientID] = { votes: 0, arr: sentenceArr };
	}

	clearSentences ()
	{
		this.sentences = {};
	}

	/**
	 * @param   {string} clientID
	 * @returns {boolean}
	 */
	hasSentence ( clientID )
	{
		return has (this.sentences, clientID);
	}

	getSentences ()
	{
		return this.sentences;
	}

	/**
	 * @param {string} clientID
	 */
	addVote ( clientID )
	{
		if ( this.hasSentence (clientID) )
		{
			this.sentences[clientID].votes++;
		}
	}

	/**
	 * @param   {string} clientID
	 * @returns {integer} -1 if invalid clientID
	 */
	getNumVotes ( clientID )
	{
		return this.hasSentence (clientID) ? this.sentences[clientID].votes : -1;
	}

	getWordbanks ()
	{
		const { wordbanks } = this;
		const { length }    = wordbanks;

		const arr = [];

		for ( let i = 0; i < length; i++ )
		{
			arr.push (wordbanks[i].toJSON ());
		}

		return arr;
	}

	/**
	 * @param {string[]} substitutes
	 */
	async fetchWords ( substitutes )
	{
		const { wordbanks } = this;
		const { length }    = wordbanks;

		const promises = [];

		for ( let i = 0; i < length; i++ )
		{
			promises.push (wordbanks[i].fetchWords (substitutes));
		}

		return Promise.all (promises);
	}
}


module.exports = GameRoomSentences;
