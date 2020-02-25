const Knex = require('knex')
const { Model } = require('objection')
const Person = require('./Person')

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 5, idleTimeoutMillis: 5000 }
})

Model.knex(knex)

async function main() {
  await Person.query().insert({
    name: 'John'
  })

  console.log(await Person.query().where('name', 'John'))
  console.log(await knex.raw('SELECT * FROM persons'))
}

main()
