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
	return string;  // Unneeded for now because React sanitizes by default.  I still want to keep the
	                // functionality for now in case I need it, so I just commented out the old code.

	// TODO: Remove sanitization functionality altogether.

	// return string.replace (/[&<>"'`/\\\\;:\(\){}=]/ig, match => (map[match]));
};

/**
 * Strips out all characters that are either ASCII control characters, or not ASCII at all.
 */
const stripNonASCII = string =>
{
	return string.replace (/[^\x20-\x7E]/g, '');
};


module.exports = { sanitizeString, stripNonASCII };
