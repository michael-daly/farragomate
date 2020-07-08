const got = require ('got');

const objectToURL = require ('~/util/objectToURL.js');
const apiRequest  = require ('$/config/apiRequest.js');

const { isValidIndex } = require ('~/util/arrays.js');

const API_KEY = require ('$/config/apiKey.js');


class GameWordbank
{
	/**
	 * @param {string|null} [include=null] - Parts of speech to include in the request.
	 */
	constructor ( include = null )
	{
		let request = null;

		if ( include !== null )
		{
			request = objectToURL (
			{
				...apiRequest,

				includePartOfSpeech: include,
				api_key:             API_KEY,
			});
		}

		this.words      = [];
		this.requestURL = request;
		this.isDeleted  = false;
	}

	delete ()
	{
		if ( this.isDeleted )
		{
			return;
		}

		delete this.words;
		delete this.requestURL;

		this.isDeleted = true;
	}

	/**
	 * @param   {Integer} index
	 * @returns {boolean}
	 */
	isValidWord ( index )
	{
		return isValidIndex (this.words, index);
	}

	async fetchWords ()
	{
		if ( this.isDeleted || this.requestURL === null )
		{
			return;
		}

		const body = await got (this.requestURL).json ();

		// We need two `isDeleted` checks because it's asynchronous.
		if ( this.isDeleted )
		{
			return;
		}

		const words = [];

		const { length } = body;

		for ( let i = 0; i < length; i++ )
		{
			words.push (body[i].word);
		}

		this.words = words;
	}

	toJSON ()
	{
		return this.words.slice ();
	}

	toString ()
	{
		return JSON.stringify (this.toJSON ());
	}
}


module.exports = GameWordbank;
