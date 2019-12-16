const Server = require('socket.io')
const config = require('./config.js')

const io = new Server(config.server.port, config.server.options)

io.on('connection', socket => {

  console.log(`${socket.id} connected`)

  socket.on('message', (data) => {
    console.log(`"${data}" from ${socket.id}`)
    socket.broadcast.binary(false).emit('broadcast', data)
  })

  socket.on('disconnect', (reason) => {
    console.log(`${socket.id} disconnected`)
  })
})
