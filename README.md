# Farragomate

A remake of the classic Casual Collective game.  Compete with your friends to create the funniest sentences!

Live version available at http://45.33.45.17:3000

![](https://i.imgur.com/LCdDqa0.jpg)


### How to Install

Before installing, you'll need to get a Wordnik API key. This is the API the server uses to get the random selection of words.

1. Run `npm install` command in root directory
2. Run `webpack` command in root directory
3. Create `apiKey.js` file in `server/config` folder
    * Look at `apiKey.example.js` for what the format should be
    * You'll need a [Wordnik API key](http://developer.wordnik.com/) for it to work
4. Run `node server/main.js`


### How to Play

1. Create your sentence from the random selection of words given to you at the beginning of each round.
2. Once the time is up, you will be shown other players' sentences and be asked to pick your favorite one. (Note that your own sentence isn't shown because you cannot vote for it.)
3. Once the time is up, the voting results will be shown.
4. This cycle will repeat until the end of the game where the final scores will be displayed.


### To Do

* [X]  Add filter for player names, Wordnik words, and player-made sentences.
* [ ]  Add a more robust client-sided filter that adds the correct number of asterisks for each character that gets censored instead of just three every time.
* [ ]  Shuffle player sentences when voting so they're not in the same order every time.
* [ ]  Add handling for API errors.
* [ ]  Add ability to put player names in sentences.
* [ ]  Change time limit for voting depending on how many sentences there are.
* [ ]  Add ability for players to "lock in" their sentences and skip to the voting phase so they don't have to wait for the timer to count down all the way.
* [ ]  Similarly, add ability for players to "lock in" their votes and skip to the voting results.
* [ ]  An ability to skip the voting results and final scores screens might be a good thing to add as well.
* [ ]  Highlight winner(s) on final scores screen.
* [ ]  Add "x/20" element to show players how many sentence tiles they have.
