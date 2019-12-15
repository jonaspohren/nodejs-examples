const queue = require('./queue')

queue.add('worker_1', { foo: 'bar' }, { repeat: { every: 1000, limit: 1000 } })
queue.add('worker_2', { foo: 'baz' }, { repeat: { every: 2000, limit: 5 } })
