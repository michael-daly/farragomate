## GameScreen ( Integer startTime )

> Singleton strategy

* [X]  Integer|null startTime=null (null means set to GameRoomInfo's timeLimit)


#### onEnterScreen ( GameRoom room )

```

```


#### onTick ( GameRoom room )


#### onLeaveScreen ( GameRoom room )


#### getStartTime ( GameRoom room )

* Returns `this.startTime`


#### getNextScreen ( GameRoom room )

* Returns the next screen in the game.
	* Sometimes based on the state of the room.
		* For instance, the VotingResults screen will either go to the FinalScores screen or back to the SentenceCreation screen, depending on whether it's the final round.
