# POC to Implement MongoDB in place of Redis

## Data-model (Big concern)

MongoDB-> Per Document size is up to 16MB,

> But By default, the in-memory storage engine uses 50% of physical RAM minus 1 GB.

Redis-> Keys are binary safe strings with length up to 512MB.

## Storage

If we store only session and client data then there is no need of MongoDB.
MongoDB can be useful for storing query and by default it can support secondary index

## High Availability

MongoDB->Automatic fail-over with replica set elections(In MongoDB)

Redis->Manual fail-over required if you need to promote a replica in another data center to master.(this is the issue which we are facing)

## Advantages of Redis
>Despite being an in-memory store, Redis persists data on disk to ensure data durability. If the Redis process crashes and restarts, it can restore the data from the disk.
>
> MongoDB supports an in-memory storage engine as part of MongoDB Enterprise. The in-memory storage engine combines the predictable latency benefits of the in-memory storage model with the rich query capabilities of MongoDB.

> (MongoDB)The in-memory storage engine doesn’t write data to persistent storage. To ensure data durability, you can deploy replica sets that use a combination of the in-memory storage engine and the default persistent storage engine. In case of a crash and restart, the nodes using the in-memory storage engine can sync from the nodes using persistent storage.


## Our Application(clearDu)

Places where Redis is been used

- Session (host,port,connectionTimeout etc)
- (login logout)
- On web-hook (call initiate, agentStatus, saveAgentStatus)
- With socket (pub , sub , Onmessage())
- On sending IVR , SMS , whatsApp

My Point of View
we should find the root cause of crashing Redis instead of changing it all together with new database. Redis is best suited for our needs

We are only storing session for users and fetch agent data on web-hooks.

Other options which can be used

- MongoDB -> Made a prototype too
- Memcached -> but there are some drawbacks
- Azure cosmos db
- IBM DB2
- Kafka -> especially for storing large amount of data for longer period of time

# InMemoryMongoPrototype

![alt text](https://webimages.mongodb.com/_com_assets/cms/kt0j5x9w036qcrckg-replica-set-in-memory.png.png?auto=format%252Ccompress)

> On MongoDB Atlas instances using the M40 tier or higher, 50% of the available memory is used for caching. The other 50% is used for in-memory operations and the other services running on the server.

![alt text](https://webimages.mongodb.com/_com_assets/cms/kt0jd5lvn4u1daaq7-wiredtiger-cache.png.png?auto=format%252Ccompress)

## Steps to start this prototype

### npm i

### npm run dev

tech used is (node and mongodb in memory server)[mongoInMemoryServer](https://github.com/tecxar-prashant-rawal/InMemoryMongoTest/tree/master)

> There will be two api get and post , get will get the data from the inMemoryServer in it exist while post will post the data in memory () which can be used to store session, userinfo , otp etc

> If the Database-path is a temporary directory (generated with tmp), then it will automatically get cleaned-up when calling .stop(), this can be disabled with .stop(false).
> If the Database-path is manually set with dbPath, then it needs to be manually cleaned-up with .cleanup(true)
