class Person {
  constructor (firstName, lastName) {
    this.setFullName(firstName, lastName)
  }

  setFullName (firstName, lastName) {
    this.name = `${firstName} ${lastName}`
  }
}

module.exports = Person
