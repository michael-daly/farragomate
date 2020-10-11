const { getRandomInt } = require ('~/util/getRandom.js');


/**
 * @param {Array}   array
 * @param {Integer} index
 *
 * @returns {boolean}
 */
const isValidIndex = ( array, index ) =>
{
	return index >= 0 && index < array.length && Number.isInteger (index);
};

/**
 * @param   {Array} array
 * @returns {Integer} A random `array` index.
 */
const getRandomIndex = array =>
{
	return getRandomInt (0, array.length - 1);
};

/**
 * @param   {Array} array
 * @returns {Integer} A random item of `array`.
 */
const getRandomItem = array =>
{
	return array[getRandomIndex (array)];
};

/**
 * Shuffles an array in place.
 *
 * @param {Array} array
 */
const shuffleArray = array =>
{
	const { length } = array;

	for ( let i = 0; i < length - 1; i++ )
	{
		const random = getRandomIndex (array);
		const temp   = array[random];

		array[random] = array[i];
		array[i]      = temp;
	}

	return array;
};


module.exports = { isValidIndex, getRandomIndex, getRandomItem, shuffleArray };
