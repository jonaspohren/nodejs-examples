const amqp = require('amqplib')
const config = require('./config')

;(async () => {
  const connection = await amqp.connect(config.rabbitmq.url)

  const e = config.rabbitmq.exchange
  const channel = await connection.createChannel()

  await channel.assertExchange(e, 'fanout', { durable: false, autoDelete: true })

  channel.publish(e, '', Buffer.from(process.argv[2] || 'something to do'))

  setTimeout(async () => {
    await connection.close()
  }, 500)
})()
