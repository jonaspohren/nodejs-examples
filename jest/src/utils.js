module.exports = {
  capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
  formatName (name) {
    return `Name: ${this.capitalize(name)}`
  }
}
