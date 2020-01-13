module.exports = {
  capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
  reduce (str) {
    return str.slice(0, 15) + '...'
  }
}
