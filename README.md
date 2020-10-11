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
