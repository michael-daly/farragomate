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

* [X]  RegisterInfo
	* [X]  Request
	* [X]  Response

* [X]  CreateRoom
	* [X]  Request
	* [X]  Response

* [X]  JoinRoom
	* [X]  Request
	* [X]  Response
	* [X]  Can also be used as a DataPacket to notify members of the room someone joined.

* [ ]  LeaveRoom
	* [-]  DataPacket from client to server.
	* [X]  Can also be used as a DataPacket from server to client to notify members of the room someone left.

* [ ]  KickClient
	* [ ]  Request
	* [X]  Response
	* [X]  Can also be used as a DataPacket from server to client to notify members of the room someone (potentially them) got kicked.

* [ ]  BanClient
	* [ ]  Request
	* [ ]  Response
	* [ ]  Can also be used as a DataPacket from server to client to notify members of the room someone (potentially them) got banned.

* [X]  RoomInfo
	* [X]  DataPacket from server to client.
	* [X]  Does not have to contain all fields as it's also used to send time updates.

* [ ]  RoomList
	* [ ]  Request
	* [X]  Response

* [ ]  ClientList
	* [X]  DataPacket from server to client when the client first joins the room.

* [X]  Wordbanks
	* [X]  DataPacket from server to client to send available words at beginning of each round.

* [X]  SendSentence
	* [X]  Request
	* [X]  Response

* [X]  ClientSentences
	* [X]  DataPacket from server to client.
	* [X]  Used in both the "SentenceVoting" screen and the "VotingResults" screen.

* [X]  CastVote
	* [X]  Request
	* [X]  Response
