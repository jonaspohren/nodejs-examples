const { Model } = require('objection')

class Person extends Model {
  static get tableName() {
    return 'persons'
  }
}

module.exports = Person
