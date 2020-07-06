const { has, hasFunction } = require ('~/util/has.js');


class GameObjectMap
{
	constructor ()
	{
		this.map = new Map ();
	}

	/**
	 * @param {Object} object
	 */
	addObject ( object )
	{
		if ( has (object, 'id') && hasFunction (object, 'delete') )
		{
			this.map.set (object.id, object);
		}
	}

	/**
	 * @param {string} objectID
	 */
	deleteObject ( objectID )
	{
		const object = this.getObject (objectID);

		if ( object !== null )
		{
			this.map.delete (objectID);
			object.delete ();
		}
	}

	/**
	 * @param   {string} objectID
	 * @returns {string|null} null if not found
	 */
	getObject ( objectID )
	{
		return this.map.has (objectID) ? this.map.get (objectID) : null;
	}

	get size ()
	{
		return this.map.size;
	}
}


module.exports = GameObjectMap;
