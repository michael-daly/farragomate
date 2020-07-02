## PacketManager

* [ ]  Integer currSeq
* [ ]  Map pendingPackets
* [ ]  EventEmitter packetHandlers


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


#### onPacket ( Integer type, Function callback )

```js
this.packetHandlers.on (type, callback);
```


#### offPacket ( Integer type, Function callback )

```js
return this.packetHandlers.off (type, callback);
```


#### handlePacket ( Packet packet )

```js
const callbackArg = {};

if ( packet instanceof ResponsePacket )
{
	const { pendingPackets } = this;

	if ( !pendingPackets.has (packet.sequence) )
	{
		return;
	}

	callbackArg.request = pendingPackets.get (packet.sequence);

	pendingPackets.delete (packet.sequence);
}

this.packetHandlers.emit (packet.type, callbackArg);
```
