## PacketManager

* [ ]  Integer currSeq
* [ ]  Map pendingPackets


#### createDataPacket ( Integer type, <\*> body )

```js
return new DataPacket (type, body);
```


#### createRequestPacket ( Integer type, <\*> body )

```js
const packet = new RequestPacket (type, body);

this.pendingPackets.set (packet.sequence, packet);

return packet;
```


#### createResponsePacket ( Integer type, <\*> body )

```js
return new ResponsePacket (type, body);
```


#### hasPendingPacket ( Integer sequence )

```js
return pendingPackets.has (sequence);
```


#### deletePendingPacket ( Integer sequence )

```js
pendingPackets.delete (sequence);
```
