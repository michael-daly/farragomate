/**
 * A data structure for storing multiple values in the same key.
 */
class SetMap
{
	constructor ()
	{
		this.map = new Map ();
	}

	/**
	 * Adds a value at the key.
	 *
	 * @param {*} key
	 * @param {*} value
	 *
	 * @returns {integer} Number of values now at the key.
	 */
	add ( key, value )
	{
		const { map } = this;

		if ( !map.has (key) )
		{
			map.set (key, new Set ());
		}

		map.get (key).add (value);

		return map.get (key).size;
	}

	/**
	 * Removes a value from a key.
	 *
	 * @param {*} key   - The key we want to delete a value/values from.
	 * @param {*} value - The value we want to remove.
	 *
	 * @returns {integer|null} Number of values now at the key, or null if not found.
	 */
	remove ( key, value )
	{
		const { map } = this;

		if ( !map.has (key) )
		{
			return null;
		}

		const set = map.get (key);

		set.delete (value);

		// If there's nothing in the set, we don't need it anymore so just remove it.
		if ( set.size <= 0 )
		{
			map.delete (key);
		}

		return set.size;
	}

	/**
	 * Deletes all values at a key.
	 *
	 * @param {*} key
	 */
	removeAll ( key )
	{
		const { map } = this;

		if ( !map.has (key) )
		{
			return;
		}

		map.get (key).clear ();
		map.delete (key);
	}

	/**
	 * Get all values at a key.
	 *
	 * @param {*} key
	 *
	 * @returns {Iterator|null} An iterator of all the values, or null if there are no values.
	 */
	get ( key )
	{
		if ( this.map.has (key) )
		{
			return this.map.get (key).values ();
		}

		return null;
	}

	/**
	 * @param {*} key
	 * @param {*} value
	 *
	 * @returns {boolean}
	 */
	has ( key, value )
	{
		return this.map.has (key) && this.map.get (key).has (value);
	}

	/**
	 * Clears all sets and everything else in the map.
	 */
	clear ()
	{
		const { map } = this;

		for ( let [key] of map )
		{
			map.get (key).clear ();
		}

		map.clear ();
	}

	/**
	 * Calls a callback function for all values mapped to the key.
	 *
	 * @param {*}        key
	 * @param {Function} callback
	 */
	forEach ( key, callback )
	{
		const { map } = this;

		if ( !map.has (key) )
		{
			return;
		}

		const set = map.get (key);

		let index = 0;

		for ( let value of set )
		{
			callback (value, index++);
		}
	}
}


module.exports = SetMap;
