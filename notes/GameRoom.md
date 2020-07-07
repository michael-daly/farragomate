## GameRoomInfo ( Object info )

* [X]  String title
	* [X]  min length: 1
	* [X]  max length: 32

* [X]  String password
	* [X]  min length: 0
	* [X]  max length: 12

* [X]  Integer maxClients
	* [X]  min: 1
	* [X]  max: 16

* [X]  Integer timeLimit
	* [X]  min: 30
	* [X]  max: 120

* [X]  Integer numRounds
	* [X]  min: 1
	* [X]  max: 16


## GameRoom ( Integer id, Integer ownerID, GameRoomInfo info )

* [X]  Integer id
* [X]  Integer ownerID
* [X]  GameRoomInfo info
* [X]  Set clientIDs
* [X]  Integer currRound
* [ ]  Timer timer
* [ ]  GameScreen screen
* [ ]  GameWordbank wordbank
