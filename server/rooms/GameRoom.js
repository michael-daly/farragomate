const { v4: uuid } = require ('uuid');

const { has } = require ('~/util/has.js');

const Timer = require ('~/Timer.js');

const GameRoomClients   = require ('$/rooms/GameRoomClients.js');
const GameRoomSentences = require ('$/rooms/GameRoomSentences.js');
const SentenceCreation  = require ('$/screens/SentenceCreation.js');

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

		this.clients   = new GameRoomClients ();
		this.sentences = new GameRoomSentences ();
		this.timer     = new Timer ();

		this.screen = SentenceCreation;

		this.isDeleted = false;
	}

	delete ()
	{
		if ( this.isDeleted )
		{
			return;
		}

		this.clients.delete ();
		this.sentences.delete ();
		this.timer.delete ();

		delete this.id;
		delete this.ownerID;
		delete this.info;
		delete this.currRound;
		delete this.clients;
		delete this.sentences;
		delete this.timer;
		delete this.screen;

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
	 * @param   {string} clientID
	 * @returns {boolean}
	 */
	isOwner ( clientID )
	{
		return clientID === this.ownerID;
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

	get isFull ()
	{
		return this.clients.size >= this.info.maxClients;
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
