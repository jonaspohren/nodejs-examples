const queue = require('./queue')

queue.process('worker_1', `${__dirname}/processor.js`)
queue.process('worker_2', `${__dirname}/processor.js`)

queue.on('error', (error) => {
  console.log(error)
})

queue.on('completed', async (job, result) => {
  console.log(`Job ${job.id} completed ${JSON.stringify(result)}`)

  if (result.status === 'delete') {
    await queue.removeRepeatable(job.name, { ...job.opts.repeat })
  }
})

queue.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed ${JSON.stringify(err)}`)
})
