const amqp = require('amqplib')
const config = require('./config')

;(async () => {
  const connection = await amqp.connect(config.rabbitmq.url)

  const e = config.rabbitmq.exchange
  const channel = await connection.createChannel()

  await channel.assertExchange(e, 'fanout', { durable: false, autoDelete: true })

  const q = await channel.assertQueue('', { exclusive: true })

  await channel.bindQueue(q.queue, e, '')

  await channel.consume(q.queue, (msg) => {
    console.log(msg.content.toString())
    channel.ack(msg)
  })
})()
