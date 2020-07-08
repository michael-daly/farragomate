const { v4: uuid } = require ('uuid');

const Timer        = require ('~/Timer.js');
const EventEmitter = require ('~/EventEmitter.js');

const GameRoomClients   = require ('$/rooms/GameRoomClients.js');
const GameRoomSentences = require ('$/rooms/GameRoomSentences.js');


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

		this.timer     = new Timer ();
		this.events    = new EventEmitter ();
		this.clients   = new GameRoomClients ();
		this.sentences = new GameRoomSentences ();

		this.screen = null;

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

		this.events.clear ();

		delete this.id;
		delete this.ownerID;
		delete this.info;
		delete this.currRound;
		delete this.clients;
		delete this.sentences;
		delete this.events;
		delete this.timer;
		delete this.screen;

		this.isDeleted = true;
	}

	/**
	 * @param {GameScreen} screen
	 */
	start ( screen )
	{
		this.screen = screen;
		this.enterScreen ();
	}

	enterScreen ()
	{
		const { events, screen } = this;

		screen.onEnterScreen (this).then (() =>
		{
			events.emit ('enterScreen', screen);
		});
	}

	leaveScreen ()
	{
		const { events, screen } = this;

		screen.onLeaveScreen (this).then (() =>
		{
			events.emit ('leaveScreen', screen);
		});
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
