const { hasOwnProperty } = Object.prototype;

/**
 * Safe wrapper for `object.hasOwnProperty()`
 *
 * @param {Object} object
 * @param {string} key
 *
 * @returns {boolean}
 */
const has = ( object, key ) =>
{
	return hasOwnProperty.call (object, key);
};

/**
 * @param {Object}   object
 * @param {string[]} keys
 *
 * @returns {boolean}
 */
const hasMultiple = ( object, keys ) =>
{
	const { length } = keys;

	for ( let i = 0; i < length; i++ )
	{
		if ( !has (object, keys[i]) )
		{
			return false;
		}
	}

	return true;
};

/**
 * @param {Object} object
 * @param {string} funcName
 *
 * @returns {boolean}
 */
const hasFunction = ( object, funcName ) =>
{
	return typeof object[funcName] === 'function';
}


module.exports = { has, hasMultiple, hasFunction };
