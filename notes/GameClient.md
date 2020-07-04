## GameClientInfo ( String name )

* [X]  String name
       * [X]  Must be unique.
       * [X]  min length: 1
       * [X]  max length: 24


## GameClient ( Integer id, WebSocket socket, GameClientInfo info )

* [X]  Integer id
* [X]  WebSocket socket
* [X]  GameClientInfo info
* [X]  Integer|null roomID=null
* [X]  PacketManager packets
