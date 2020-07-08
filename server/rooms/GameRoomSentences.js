const GameWordbank = require ('$/wordbanks/GameWordbank.js');

const words = require ('$/config/words.js');


class GameRoomSentences
{
	constructor ()
	{
		this.sentences = {};
		this.wordbanks =
		{
			adjectives: new GameWordbank ('adjective'),
			nouns:      new GameWordbank ('noun'),
			verbs:      new GameWordbank ('verb'),
			grammar:    [ ...words.grammar ],
			pronouns:   [ ...words.pronouns ],
			misc:       [ ...words.misc ],
		};

		this.isDeleted = false;
	}

	delete ()
	{
		if ( this.isDeleted )
		{
			return;
		}

		this.wordbanks.adjectives.delete ();
		this.wordbanks.nouns.delete ();
		this.wordbanks.verbs.delete ();

		delete this.sentences;
		delete this.wordbanks;

		this.isDeleted = true;
	}

	/**
	 * @param {string}    clientID
	 * @param {Integer[]} sentenceArr
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

		const object =
		{
			...wordbanks,

			adjectives: wordbanks.adjectives.toJSON (),
			nouns:      wordbanks.nouns.toJSON (),
			verbs:      wordbanks.verbs.toJSON (),
		};

		return object;
	}

	async fetchWords ()
	{
		const { wordbanks } = this;

		const promises =
		[
			wordbanks.adjectives.fetchWords (),
			wordbanks.nouns.fetchWords (),
			wordbanks.verbs.fetchWords (),
		];

		return Promise.all (promises);
	}
}


module.exports = GameRoomSentences;
