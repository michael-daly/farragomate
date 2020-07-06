## GameRoomInfo ( Object info )

* [X]  String title
	* [ ]  min length: 1
	* [ ]  max length: 32

* [X]  String password
	* [ ]  min length: 0
	* [ ]  max length: 12

* [X]  Integer maxClients
	* [ ]  min: 1
	* [ ]  max: 16

* [X]  Integer timeLimit
	* [ ]  min: 30
	* [ ]  max: 120

* [X]  Integer numRounds
	* [ ]  min: 1
	* [ ]  max: 16


## GameRoom ( Integer id, Integer ownerID, GameRoomInfo info )

* [X]  Integer id
* [X]  Integer ownerID
* [X]  GameRoomInfo info
* [X]  Set clientIDs
* [X]  Integer currRound
* [ ]  Timer timer
* [ ]  GameScreen screen
* [ ]  GameWordbank wordbank
