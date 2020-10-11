/**
 * Random number function courtesy of MDN.
 */

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param {number} min
 * @param {number} max
 *
 * @returns {number} A random whole number within the range (min, max).
 */
const getRandomInt = ( min, max ) =>
{
    min = Math.ceil (min);
    max = Math.floor (max);

    return Math.floor (Math.random () * (max - min + 1)) + min;
}


module.exports = { getRandomInt };
