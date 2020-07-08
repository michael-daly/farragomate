const GameWordbank = require ('$/wordbanks/GameWordbank.js');


class FixedWordbank extends GameWordbank
{
	/**
	 * @param {string[]} words
	 */
	constructor ( words )
	{
		super ();
		this.words = words;
	}

	async fetchWords () {}
}


module.exports = FixedWordbank;
