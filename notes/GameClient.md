## GameClientInfo ( String name )

* [X]  String name
       * [ ]  Must be unique.
       * [ ]  min length: 1
       * [ ]  max length: 24


## GameClient ( Integer id, WebSocket socket, GameClientInfo info )

* [X]  Integer id
* [X]  WebSocket socket
* [X]  GameClientInfo info
* [X]  Integer|null roomID=null
* [X]  PacketManager packets
