class GameScreen
{
	/**
	 * @param {string}       name
	 * @param {integer|null} [startTime=null] - null sets it to the GameRoomInfo's `timeLimit` field.
	 */
	constructor ( name, startTime = null )
	{
		this.name      = name;
		this.startTime = startTime;
	}

	/**
	 * @param   {GameRoom} room
	 * @returns {Integer}
	 */
	getStartTime ( room )
	{
		return this.startTime === null ? room.getInfoField ('timeLimit') : this.startTime;
	}

	/**
	 * @param   {GameRoom} room
	 * @returns {GameScreen}
	 */
	getNextScreen ( room )
	{
		throw new Error (`${this.constructor.name}::getNextScreen () - Not implemented!`);
	}

	/**
	 * @param {GameRoom} room
	 */
	async onEnterScreen ( room ) { /* Stub method to be implemented. */ }

	/**
	 * @param {GameRoom} room
	 */
	async onLeaveScreen ( room ) { /* Stub method to be implemented. */ }
}


module.exports = GameScreen;
