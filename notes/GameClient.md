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
