## GameRoomInfo ( Object info )

* [ ]  title
       * [ ]  min length: 1
       * [ ]  max length: 32

* [ ]  password
       * [ ]  min length: 0
       * [ ]  max length: 32

* [ ]  maxPlayers
       * [ ]  min: 1
       * [ ]  max: 16

* [ ]  timeLimit
       * [ ]  min: 30
       * [ ]  max: 120

* [ ]  numRounds
       * [ ]  min: 1
       * [ ]  max: 16


## GameRoom ( Integer ownerID, GameRoomInfo info )

* [ ]  ownerID
* [ ]  info
* [ ]  playerIDs = Set
* [ ]  currTime
* [ ]  currRound
* [ ]  timer = Timer
* [ ]  screen = GameScreen
* [ ]  wordbank = GameWordbank
