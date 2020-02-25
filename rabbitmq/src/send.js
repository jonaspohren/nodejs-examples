const amqp = require('amqplib')
const config = require('./config')

async function init() {
  const connection = await amqp.connect(config.rabbitmq.url)

  const q = config.rabbitmq.channel
  const channel = await connection.createChannel()

  await channel.assertQueue(q, { autoDelete: false })

  channel.sendToQueue(q, Buffer.from(process.argv[2] || 'something to do'))

  setTimeout(async () => {
    await connection.close()
  }, 500)
}

init()
