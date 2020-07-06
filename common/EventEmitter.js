const SetMap = require ('~/SetMap.js');


class EventEmitter
{
	constructor ()
	{
		this.map = new SetMap ();
	}

	/**
	 * @param {string}   event
	 * @param {Function} callback
	 */
	on ( event, callback )
	{
		this.map.add (event, callback);
	}

	/**
	 * @param {string}   event
	 * @param {Function} callback
	 */
	off ( event, callback )
	{
		this.map.remove (event, callback);
	}

	/**
	 * @param {string} event
	 * @param {...*}   args
	 */
	emit ( event, ...args )
	{
		this.map.forEach (event, callback =>
		{
			callback (...args);
		});
	}

	clear ()
	{
		this.map.clear ();
	}
}


module.exports = EventEmitter;
