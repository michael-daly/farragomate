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
* [ ]  PacketManager packetManager


#### sendDataPacket ( Integer type, <\*> body )

```js
const packet = this.packetManager.createDataPacket (type, body);

this.socket.send (packet.toString ());
```


#### sendRequestPacket ( Integer type, <\*> body )

```js
const packet = this.packetManager.createRequestPacket (type, body);

this.socket.send (packet.toString ());
```


#### sendResponsePacket ( RequestPacket request, Object body )

```js
const packet = this.packetManager.createResponsePacket (request, body);

this.socket.send (packet.toString ());
```
