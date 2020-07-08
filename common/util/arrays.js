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


module.exports = { isValidIndex };
