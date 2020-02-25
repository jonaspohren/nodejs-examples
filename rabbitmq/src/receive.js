const amqp = require('amqplib')
const config = require('./config')

async function init() {
  const connection = await amqp.connect(config.rabbitmq.url)

  const q = config.rabbitmq.channel
  const channel = await connection.createChannel()

  await channel.assertQueue(q, { autoDelete: false })

  channel.prefetch(1)

  channel.consume(q, (msg) => {
    console.log(msg.content.toString())
    channel.ack(msg)
  })
}

init()
