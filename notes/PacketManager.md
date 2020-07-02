## PacketManager

* [ ]  Integer currSeq
* [ ]  Map pendingPackets


#### createDataPacket ( Integer type, <\*> body )

```js
return new DataPacket (this.currSeq++, type, body);
```


#### createRequestPacket ( Integer type, <\*> body )

```js
const packet = new RequestPacket (this.currSeq++, type, body);

this.pendingPackets.set (packet.sequence, packet);

return packet;
```


#### createResponsePacket ( Packet packet, <\*> body )

```js
return new ResponsePacket (this.currSeq++, packet, body);
```


#### hasPendingPacket ( Integer sequence )

```js
return pendingPackets.has (sequence);
```


#### removePendingPacket ( Integer sequence )

```js
pendingPackets.delete (sequence);
```
