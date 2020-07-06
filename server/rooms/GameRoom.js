const { v4: uuid } = require ('uuid');

const { has } = require ('~/util/has.js');

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

		this.isDeleted = false;
	}

	delete ()
	{
		if ( this.isDeleted )
		{
			return;
		}

		this.clientIDs.clear ();

		delete this.id;
		delete this.ownerID;
		delete this.info;
		delete this.clientIDs;
		delete this.currRound;

		this.isDeleted = true;
	}

	/**
	 * @param {string} field
	 * @param {*}      value
	 */
	setInfoField ( field, value )
	{
		if ( has (fieldData, field) )
		{
			this.info[field] = value;
		}
	}

	/**
	 * @param   {string} field
	 * @returns {*}
	 */
	getInfoField ( field )
	{
		if ( has (fieldData, field) )
		{
			return this.info[field];
		}
	}

	/**
	 * @returns {boolean}
	 */
	isFull ()
	{
		return this.clientIDs.size >= this.info.maxPlayers;
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
