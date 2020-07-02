## GameObjectMap ( Constructor accept )

* [ ]  Map map
* [ ]  Constructor accept


#### add ( Object object )

```js
// Maybe have some sort of implements() function for making sure an object has the right fields/methods?
// Because we'll need to check if it has an `id` field, a `sendPacket()` method, and a `delete()` method.
if ( object instanceof this.accept && implements (object, GameObjectInterface) )
{
	this.map.set (object.id, object);
}
```


#### remove ( String objectID )

```js
const { map } = this;

if ( map.has (objectID) )
{
	const object = map.get (objectID);

	map.delete (objectID);

	return object;
}

return null;
```


#### delete ( String objectID )

```js
const object = this.remove (objectID);

if ( object !== null )
{
	object.delete ();
}
```


#### sendPacket ( String objectID, Packet packet )

```js
const { map } = this;

if ( map.has (objectID) )
{
	map.get (objectID).sendPacket (objectID, packet);
}
```
