## GameRoomInfo ( info = { ... } )

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


## GameRoom ( ownerID, info = GameRoomInfo )

* [ ]  ownerID
* [ ]  info
* [ ]  playerIDs = Set
* [ ]  currRound
* [ ]  screen = GameScreen
* [ ]  wordbank = GameWordbank
