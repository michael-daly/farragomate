const SentenceCreation = require ('$/screens/SentenceCreation.js');
const SentenceVoting   = require ('$/screens/SentenceVoting.js');
const VotingResults    = require ('$/screens/VotingResults.js');
const FinalScores      = require ('$/screens/FinalScores.js');

const { has } = require ('~/util/has.js');


const screens =
{
	SentenceCreation,
	SentenceVoting,
	VotingResults,
	FinalScores,
};


/**
 * @param   {string} screenName
 * @returns {GameScreen|null} null if not found
 */
module.exports = screenName =>
{
	return has (screens, screenName) ? screens[screenName] : null;
};
