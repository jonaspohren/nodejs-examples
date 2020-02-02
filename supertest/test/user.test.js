const request = require('supertest')
const server = require('../server')

describe('User Test', () => {

  test('GET /user', async () => {
    const response = await request(server)
      .get('/user')

    expect(response.statusCode).toBe(200)
    expect(response.get('Content-Type')).toMatch(/application\/json/)
    expect(response.body).toHaveProperty('name', expect.any(String))
    expect(response.body).toHaveProperty('age', expect.any(Number))
    expect(response.body).toHaveProperty('job.title', expect.any(String))
  })

  test('POST /user', async () => {
    const response = await request(server)
      .post('/user')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send('name=John')

    expect(response.statusCode).toBe(200)
    expect(response.get('Content-Type')).toMatch(/application\/json/)
    expect(response.body).toMatchObject({ id: expect.any(Number) })
    //expect(response.body).toEqual({ id: expect.any(Number), name: 'John' })
  })
})

afterAll(() => {
  server.close()
})