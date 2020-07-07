/**
 * @param   {Object} obj
 * @returns {string}
 */
const objectToURL = obj =>
{
	let url = '';

	for ( let field in obj )
	{
		if ( field === 'baseURL')
		{
			continue;
		}

		if ( url.length <= 0 )
		{
			url = `?${field}=${obj[field]}`;
		}
		else
		{
			url += `&${field}=${obj[field]}`;
		}
	}

	return encodeURI (obj.baseURL + url);
};


module.exports = objectToURL;
