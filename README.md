# POC  to Implement MongoDB in place of Redis

## Data-model (Big concern)

MongoDB-> Document size is up to 16MB, 

Redis-> Keys are binary safe strings with length up to 512MB.

## Storage
If we store only session and client data then there is no need of MongoDB.
MongoDB can be useful for storing query and by default it can support secondary index

## High Availability

MongoDB->Automatic fail-over with replica set elections(In MongoDB)

Redis->Manual fail-over required if you need to promote a replica in another data center to master.(this is the issue which we are facing)

## Advantages of Redis
Despite being an in-memory store, Redis persists data on disk to ensure data durability. If the Redis process crashes and restarts, it can restore the data from the disk.

## Our Application(clearDu)

Places where Redis is been used
* Session (host,port,connectionTimeout etc)
* (login logout)
* On web-hook (call initiate, agentStatus, saveAgentStatus)
* With socket (pub , sub , Onmessage())
* On sending IVR , SMS , whatsApp







My Point of View
we should find the root cause of crashing Redis instead of changing it all together with new database. Redis is best suited for our needs

We are only storing session for users and fetch agent data on web-hooks.

Other options which can be used 
* Memcached -> but there are some drawbacks
* MongoDB -> made a prototype too
* Azure cosmos db 
* IBM DB2
* Kafka -> especially for storing large amount of data for longer period of time


# InMemoryMongoTest
## Steps to start this prototype
### npm i 
### npm run dev

> There will be two api get and post , get will get the data from the inMemoryServer in it exist while post will post the data in memory () which can be used to store session, userinfo , otp etc

> If the Database-path is a temporary directory (generated with tmp), then it will automatically get cleaned-up when calling .stop(), this can be disabled with .stop(false).
If the Database-path is manually set with dbPath, then it needs to be manually cleaned-up with .cleanup(true)
