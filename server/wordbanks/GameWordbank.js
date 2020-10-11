const got = require ('got');

const objectToURL  = require ('~/util/objectToURL.js');
const apiRequest   = require ('$/config/apiRequest.js');
const filterRules  = require ('$/config/badWords.js');
const replacements = require ('$/config/replacements.js');

const { isValidIndex, shuffleArray } = require ('~/util/arrays.js');

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

	/**
	 * @param   {string}   word
	 * @returns {boolean}
	 */
	isBadWord ( word )
	{
		const { length } = filterRules;

		for ( let i = 0; i < length; i++ )
		{
			if ( word.match (filterRules[i]).length > 0 )
			{
				return true;
			}
		}

		return false;
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

		const words       = [];
		const substitutes = shuffleArray (replacements.slice ());

		const { length } = body;

		for ( let i = 0; i < length; i++ )
		{
			const { word } = body[i];

			if ( this.isBadWord (word, filterRules) )
			{
				words.push (substitutes.pop ());
			}
			else
			{
				words.push (word);
			}
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
