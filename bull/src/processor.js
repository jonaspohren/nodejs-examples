module.exports = (job) => {
  let random = Math.round(Math.random() * 10)

  if (random % 5 === 0) {
    return Promise.reject(new Error('Err'))
  }

  return Promise.resolve({ status: 'done' })
}
