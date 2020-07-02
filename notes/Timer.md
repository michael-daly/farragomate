## Timer

* [ ]  EventEmitter events
* [ ]  Integer timeLeft
* [ ]  TimeoutID currTimeout


#### on ( String event, Function callback )

* [ ]  event
       * [ ]  start ( startTime )
       * [ ]  tick ( currTime )
       * [ ]  stop ( stopTime, wasForced )


#### off ( String event, Function callback )


#### start ( Integer timeLeft )


#### tick ()


#### stop ()

* Returns `this.timeLeft`
