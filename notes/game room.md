## GameRoomInfo ( Object info )

* [ ]  String title
       * [ ]  min length: 1
       * [ ]  max length: 32

* [ ]  String password
       * [ ]  min length: 0
       * [ ]  max length: 32

* [ ]  Integer maxPlayers
       * [ ]  min: 1
       * [ ]  max: 16

* [ ]  Integer timeLimit
       * [ ]  min: 30
       * [ ]  max: 120

* [ ]  Integer numRounds
       * [ ]  min: 1
       * [ ]  max: 16


## GameRoom ( Integer id, Integer ownerID, GameRoomInfo info )

* [ ]  Integer id
* [ ]  Integer ownerID
* [ ]  GameRoomInfo info
* [ ]  Set playerIDs
* [ ]  Integer currTime
* [ ]  Integer currRound
* [ ]  Timer timer
* [ ]  GameScreen screen
* [ ]  GameWordbank wordbank
