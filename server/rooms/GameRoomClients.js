class GameRoomClients
{
	constructor ()
	{
		this.clientIDs = new Set ();
		this.bannedIDs = new Set ();

		this.isDeleted = false;
	}

	delete ()
	{
		if ( this.isDeleted )
		{
			return;
		}

		this.clientIDs.clear ();
		this.bannedIDs.clear ();

		delete this.clientIDs;
		delete this.bannedIDs;

		this.isDeleted = true;
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
	forEach ( callback )
	{
		const { clientIDs } = this;

		for ( let id of clientIDs )
		{
			callback (id);
		}
	}

	get size ()
	{
		return this.clientIDs.size;
	}
}


module.exports = GameRoomClients;
