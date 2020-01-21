module.exports = (job) => {
  let random = Math.round(Math.random() * 10)

  if (random % 5 === 0) {
    return Promise.reject(new Error('Error'))
  }

  if (random % 9 === 0) {
    return Promise.resolve({ status: 'delete' })
  }

  return Promise.resolve({ status: 'done' })
}
