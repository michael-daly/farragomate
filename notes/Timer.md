## Timer

* [X]  EventEmitter events
* [X]  Integer timeLeft
* [X]  TimeoutID currTimeout


#### on ( String event, Function callback )

* [X]  event
	* [X]  start ( startTime )
	* [X]  tick ( currTime )
	* [X]  stop ( stopTime, wasForced )


#### off ( String event, Function callback )


#### start ( Integer timeLeft )


#### tick ()


#### stop ()

* Returns `this.timeLeft`
