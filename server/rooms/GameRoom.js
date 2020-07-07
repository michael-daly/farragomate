const { v4: uuid } = require ('uuid');

const { has } = require ('~/util/has.js');

const Timer            = require ('~/Timer.js');
const GameWordbank     = require ('$/wordbanks/GameWordbank.js');
const SentenceCreation = require ('$/screens/SentenceCreation.js');

const words     = require ('$/config/words.js');
const fieldData = require ('$/rooms/info/fieldData.js');


class GameRoom
{
	/**
	 * @param {string}       id
	 * @param {string}       ownerID
	 * @param {GameRoomInfo} info
	 */
	constructor ( id, ownerID, info )
	{
		this.id      = id;
		this.ownerID = ownerID;
		this.info    = info;

		this.currRound = 0;
		this.clientIDs = new Set ();
		this.bannedIDs = new Set ();

		this.timer  = new Timer ();
		this.screen = SentenceCreation;

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

		this.timer.delete ();

		this.wordbanks.adjectives.delete ();
		this.wordbanks.nouns.delete ();
		this.wordbanks.verbs.delete ();

		this.clientIDs.clear ();

		delete this.id;
		delete this.ownerID;
		delete this.info;
		delete this.currRound;
		delete this.clientIDs;
		delete this.bannedIDs;
		delete this.timer;
		delete this.screen;
		delete this.sentences;
		delete this.wordbanks;

		this.isDeleted = true;
	}

	/**
	 * @param {string} field
	 * @param {*}      value
	 */
	setInfoField ( field, value )
	{
		this.info.setField (field, value);
	}

	/**
	 * @param   {string} field
	 * @returns {*} null if not valid
	 */
	getInfoField ( field )
	{
		return this.info.getField (field);
	}

	/**
	 * @param {Integer} startTime
	 */
	startTimer ( startTime )
	{
		this.timer.start (startTime);
	}

	stopTimer ()
	{
		this.timer.stop ();
	}

	/**
	 * @param {string}   event
	 * @param {Function} callback
	 */
	onTimer ( event, callback )
	{
		this.timer.events.on (event, callback);
	}

	/**
	 * @param {string}   event
	 * @param {Function} callback
	 */
	offTimer ( event, callback )
	{
		this.timer.events.off (event, callback);
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

	/**
	 * @returns {boolean}
	 */
	isFull ()
	{
		return this.clientIDs.size >= this.info.maxClients;
	}

	/**
	 * @param   {string} clientID
	 * @returns {boolean}
	 */
	isOwner ( clientID )
	{
		return clientID === this.ownerID;
	}

	/**
	 * @param {string} clientID
	 */
	addClientID ( clientID )
	{
		this.clientIDs.add (clientID);
	}

	/**
	 * @param {string} clientID
	 */
	removeClientID ( clientID )
	{
		this.clientIDs.delete (clientID);
	}

	/**
	 * @param   {string} clientID
	 * @returns {boolean}
	 */
	hasClientID ( clientID )
	{
		return this.clientIDs.has (clientID);
	}

	/**
	 * @param {string} clientID
	 */
	addBannedID ( clientID )
	{
		this.bannedIDs.add (clientID);
	}

	/**
	 * @param {string} clientID
	 */
	removeBannedID ( clientID )
	{
		this.bannedIDs.delete (clientID);
	}

	/**
	 * @param   {string} clientID
	 * @returns {boolean}
	 */
	isBannedID ( clientID )
	{
		return this.bannedIDs.has (clientID);
	}

	/**
	 * @param {Function} callback
	 */
	forEachClient ( callback )
	{
		const { clientIDs } = this;

		for ( let id of clientIDs )
		{
			callback (id);
		}
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

	/**
	 * @returns {Object}
	 */
	toJSON ()
	{
		const object = this.info.toJSON ();

		object.timeLeft  = this.timeLeft;
		object.currRound = this.currRound;

		return object;
	}

	/**
	 * @returns {string}
	 */
	toString ()
	{
		return JSON.stringify (this.toJSON ());
	}

	get timeLeft ()
	{
		return this.timer.timeLeft;
	}
}

/**
 * @param {string}       ownerID
 * @param {GameRoomInfo} info
 *
 * @returns {GameRoom}
 */
const createRoom = ( ownerID, info ) =>
{
	return new GameRoom (uuid (), ownerID, info);
};


module.exports = { GameRoom, createRoom };
