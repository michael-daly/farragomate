class GameRoomClients
{
	constructor ()
	{
		this.clientData = new Map ();
		this.bannedIDs  = new Set ();

		this.isDeleted = false;
	}

	delete ()
	{
		if ( this.isDeleted )
		{
			return;
		}

		this.clientData.clear ();
		this.bannedIDs.clear ();

		delete this.clientData;
		delete this.bannedIDs;

		this.isDeleted = true;
	}

	/**
	 * @param {string} clientID
	 */
	addClientID ( clientID )
	{
		this.clientData.set (clientID, { id: clientID, hasVoted: false, score: 0 });
	}

	/**
	 * @param {string} clientID
	 */
	removeClientID ( clientID )
	{
		this.clientData.delete (clientID);
	}

	/**
	 * @param   {string} clientID
	 * @returns {boolean}
	 */
	hasClientID ( clientID )
	{
		return this.clientData.has (clientID);
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
	 * @param {string} clientID
	 */
	addVotedID ( clientID )
	{
		this.clientData.get (clientID).hasVoted = true;
	}

	clearVotedIDs ()
	{
		const { clientData } = this;

		for ( let [id, data] of clientData )
		{
			data.hasVoted = false;
		}
	}

	/**
	 * @param   {string} clientID
	 * @returns {boolean}
	 */
	hasVotedID ( clientID )
	{
		return this.clientData.get (clientID).hasVoted;
	}

	/**
	 * @param {string}  clientID
	 * @param {integer} [amount=1]
	 */
	addScore ( clientID, amount = 1 )
	{
		this.clientData.get (clientID).score += amount;
	}

	/**
	 * @param {string}  clientID
	 * @param {integer} [amount=0]
	 */
	setScore ( clientID, amount = 0 )
	{
		this.clientData.get (clientID).score = amount;
	}

	/**
	 * @param   {string} clientID
	 * @returns {integer|null} null if clientID not found
	 */
	getScore ( clientID )
	{
		return this.clientData.has (clientID) ? this.clientData.get (clientID).score : null;
	}

	/**
	 * @returns {Object} An id=>score dictionary.
	 */
	getAllScores ()
	{
		const scores = {};

		this.forEach (( id, data ) =>
		{
			scores[id] = data.score;
		});

		return scores;
	}

	clearScores ()
	{
		this.forEach (( id, data ) =>
		{
			data.score = 0;
		});
	}

	/**
	 * @param {Function} callback
	 */
	forEach ( callback )
	{
		const { clientData } = this;

		for ( let [id, data] of clientData )
		{
			callback (id, data);
		}
	}

	get size ()
	{
		return this.clientData.size;
	}
}


module.exports = GameRoomClients;
