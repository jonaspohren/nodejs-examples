const amqp = require('amqplib')
const config = require('./config')

;(async () => {
  const connection = await amqp.connect(config.rabbitmq.url)

  const q = config.rabbitmq.channel
  const channel = await connection.createChannel()

  await channel.assertQueue(q, { autoDelete: true })

  await channel.consume(q, (msg) => {
    console.log(msg.content.toString())
    channel.ack(msg)
  })
})()
