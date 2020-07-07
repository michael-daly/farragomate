const applyDefaultValues = require ('$/fields/applyDefaultValues.js');
const fieldData          = require ('$/rooms/info/fieldData.js');

const { has } = require ('~/util/has.js');


class GameRoomInfo
{
	/**
	 * @param {Object} info
	 */
	constructor ( info )
	{
		this.title      = info.title;
		this.password   = info.password;
		this.maxClients = info.maxClients;
		this.timeLimit  = info.timeLimit;
		this.numRounds  = info.numRounds;
	}

	/**
	 * @param {string} field
	 * @param {*}      value
	 */
	setField ( field, value )
	{
		if ( has (fieldData, field) )
		{
			this[field] = value;
		}
	}

	/**
	 * @param   {string} field
	 * @returns {*} null if not valid
	 */
	getField ( field )
	{
		return has (fieldData, field) ? this[field] : null;
	}

	/**
	 * @returns {Object}
	 */
	toJSON ()
	{
		const object =
		{
			title:      this.title,
			maxClients: this.maxClients,
			timeLimit:  this.timeLimit,
			numRounds:  this.numRounds,
		};

		return object;
	}

	/**
	 * @returns {string}
	 */
	toString ()
	{
		return JSON.stringify (this.toJSON ());
	}
}

/**
 * @param   {Object} [info={}]
 * @returns {GameRoomInfo}
 */
const createRoomInfo = ( info = {} ) =>
{
	return new GameRoomInfo (applyDefaultValues (info, fieldData));
};


module.exports = { GameRoomInfo, createRoomInfo };
