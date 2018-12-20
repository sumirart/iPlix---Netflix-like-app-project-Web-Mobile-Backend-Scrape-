'use strict'

/*
|--------------------------------------------------------------------------
| Redis Subscribers
|--------------------------------------------------------------------------
|
| Here you can register the subscribers to redis channels. Adonis assumes
| your listeners are stored inside `app/Listeners` directory.
|
*/

// const Redis = use('Redis')

/**
 * Inline subscriber
 */
// Redis.subscribe('news', async () => {
// })

/**
 * Binding method from a module saved inside `app/Listeners/News`
 */
// Redis.subcribe('news', 'News.onMessage')
new Redis()       // Connect to 127.0.0.1:6379
new Redis(6380)   // 127.0.0.1:6380
new Redis(6379, '192.168.0.62')        // 192.168.1.1:6379
new Redis('/tmp/redis.sock')
new Redis({
  port: 6379,          // Redis port
  host: '192.168.0.62',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  password: 'auth',
  db: 0
})