class GameScreen
{
	/**
	 * @param {integer|null} [startTime=null] - null sets it to the GameRoomInfo's `timeLimit` field.
	 */
	constructor ( startTime = null )
	{
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
	 * @param {GameRoom} room
	 */
	onEnterScreen ( room )
	{
		throw new Error (`${this.constructor.name}::onEnterScreen () - Not implemented!`);
	}

	/**
	 * @param {GameRoom} room
	 */
	onLeaveScreen ( room )
	{
		throw new Error (`${this.constructor.name}::onLeaveScreen () - Not implemented!`);
	}

	/**
	 * @param {GameRoom} room
	 */
	onTick ( room )
	{
		throw new Error (`${this.constructor.name}::onTick () - Not implemented!`);
	}

	/**
	 * @param   {GameRoom} room
	 * @returns {GameScreen}
	 */
	getNextScreen ( room )
	{
		throw new Error (`${this.constructor.name}::getNextScreen () - Not implemented!`);
	}
}


module.exports = GameScreen;
