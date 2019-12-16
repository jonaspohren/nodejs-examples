const Client = require('socket.io-client')
const readline = require('readline')
const config = require('./config')

const io = new Client(config.client.url, config.client.options)

const rl = readline.createInterface({
  input: process.stdin
})

io.on('connect', () => {

  rl.on('line', (line) => {
    io.binary(false).emit('message', line)
  })

  io.on('broadcast', (data) => {
    console.log(data)
  })
})
