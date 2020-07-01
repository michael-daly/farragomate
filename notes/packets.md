## Packet Classes

#### Packet

* Base packet class.


#### Data Packet

* One-time send with no response needed or expected.

`{ sequence: 52, type: 6, body: { ... } }`


#### Request Packet

* Response expected. Nothing gets done until it's received.

`{ sequence: 53, type: 4, body: { ... } }`


### Response Packet

* Either an acception or a rejection. May contain more detailed information in the body.

`{ sequence: 54, type: 4, body: { response: 'OK' }, requestSeq: 53 }`


## Packet Types

* [ ]  Error
* [ ]  Warning
* [ ]  Message

* [ ]  RegisterInfo
       * [ ]  Request
       * [ ]  Response

* [ ]  CreateRoom
       * [ ]  Request
       * [ ]  Response

* [ ]  JoinRoom
       * [ ]  Request
       * [ ]  Response

* [ ]  LeaveRoom

* [ ]  KickClient
       * [ ]  Request
       * [ ]  Response

* [ ]  BanClient
       * [ ]  Request
       * [ ]  Response
