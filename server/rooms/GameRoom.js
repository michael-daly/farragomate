const { v4: uuid } = require ('uuid');

const { has } = require ('~/util/has.js');

const Timer     = require ('~/Timer.js');
const fieldData = require ('$/rooms/fieldData.js');


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

		this.clientIDs = new Set ();
		this.bannedIDs = new Set ();
		this.currRound = 0;

		this.timer = new Timer ();

		this.isDeleted = false;
	}

	delete ()
	{
		if ( this.isDeleted )
		{
			return;
		}

		this.timer.delete ();
		this.clientIDs.clear ();

		delete this.id;
		delete this.ownerID;
		delete this.info;
		delete this.clientIDs;
		delete this.currRound;
		delete this.timer;

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
	 * @returns {boolean}
	 */
	isFull ()
	{
		return this.clientIDs.size >= this.info.maxPlayers;
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
