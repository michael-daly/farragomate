const map =
{
	'&':  '&amp;',
	'<':  '&lt;',
	'>':  '&gt;',
	'"':  '&quot;',
	'\'': '&apos;',
	'`':  '&grave;',
	'/':  '&sol;',
	'\\': '&bsol;',
	';':  '&semi;',
	':':  '&colon;',
	'(':  '&lpar;',
	')':  '&rpar;',
	'{':  '&lbrace;',
	'}':  '&rbrace;',
	'=':  '&equals;',
 };

/**
 * Replaces XSS-vulnerable characters with their HTML entity counterparts.
 *
 * @param   {string} string
 * @returns {string}
 */
const sanitizeString = string =>
{
	return string.replace (/[&<>"'`/\\\\;:\(\){}=]/ig, match => (map[match]));
};

/**
 * Strips out all characters that are either ASCII control characters, or not ASCII at all.
 */
const stripNonASCII = string =>
{
	return string.replace (/[^\x20-\x7E]/g, '');
};


module.exports = { sanitizeString, stripNonASCII };
