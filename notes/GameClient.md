## GameClientInfo ( String name )

* [ ]  String name
       * [ ]  Must be unique.
       * [ ]  min length: 1
       * [ ]  max length: 24


## GameClient ( Integer id, WebSocket socket, GameClientInfo info )

* [ ]  Integer id
* [ ]  WebSocket socket
* [ ]  GameClientInfo info
* [ ]  PacketManager packetManager
* [ ]  Integer|null roomID=null
