## Packet Types

#### Packet

* Base packet class.


#### Data Packet

* One-time send with no response needed or expected.


#### Request Packet

* Response expected. Nothing gets done until it's received.


### Response Packet

* Either an acception or a rejection. May contain more detailed information in the body.


## Packet Commands

* [ ]  Error
* [ ]  Warning
* [ ]  Message

* [ ]  RegisterInfo
	* [ ]  Request
	* [X]  Response

* [ ]  CreateRoom
	* [ ]  Request
	* [X]  Response

* [ ]  JoinRoom
	* [ ]  Request
	* [ ]  Response
	* [X]  Can also be used as a DataPacket to notify members of the room someone joined.

* [ ]  LeaveRoom
	* [ ]  DataPacket from client to server.
	* [ ]  Can also be used as a DataPacket from server to client to notify members of the room someone left.

* [ ]  KickClient
	* [ ]  Request
	* [ ]  Response
	* [ ]  Can also be used as a DataPacket from server to client to notify members of the room someone (potentially them) got kicked.

* [ ]  BanClient
	* [ ]  Request
	* [ ]  Response
	* [ ]  Can also be used as a DataPacket from server to client to notify members of the room someone (potentially them) got banned.

* [ ]  RoomInfo
	* [ ]  DataPacket from server to client.
	* [ ]  Does not have to contain all fields as it's also used to send time updates.

* [ ]  RoomList
	* [ ]  Request
	* [ ]  Response

* [ ]  PlayerList
	* [ ]  DataPacket from server to client when the client first joins the room.

* [ ]  SendSentence
	* [ ]  Request
	* [ ]  Response

* [ ]  PlayerSentences
	* [ ]  DataPacket from server to client.
	* [ ]  Used in both the "SentenceVoting" screen and the "VotingResults" screen.

* [ ]  CastVote
	* [ ]  Request
	* [ ]  Response

* [ ]  PlayerScores
	* [ ]  DataPacket from server to client.
