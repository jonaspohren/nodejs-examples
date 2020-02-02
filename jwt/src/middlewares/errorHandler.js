const errorHandler = (err, req, res, next) => {
  console.error(err)
  res.json({ message: err.name })
}

module.exports = errorHandler