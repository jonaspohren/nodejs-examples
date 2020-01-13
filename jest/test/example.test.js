const { capitalize } = require('../src/utils')

describe('My Tests', () => {
  beforeEach(() => {
    console.log('Before')
  })

  test('First Test', () => {
    const result = capitalize('jonas')

    expect(result).toBe('Jonas')
  })

  afterEach(() => {
    console.log('After')
  })
})
