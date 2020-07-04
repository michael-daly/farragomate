/**
 * Strips out all characters that are either ASCII control characters, or not ASCII at all.
 */
const stripNonASCII = string =>
{
	return string.replace (/[^\x20-\x7E]/g, '');
};


module.exports = stripNonASCII;
