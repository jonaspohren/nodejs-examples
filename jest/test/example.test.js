const utils = require('../src/utils')

describe('My Tests', () => {
  test('First Test', () => {
    const capitalizeMock = jest.spyOn(utils, 'capitalize').mockReturnValue('John')

    const formattedName = utils.formatName('john')

    expect(capitalizeMock).toHaveBeenCalled()
    expect(formattedName).toEqual('Name: John')

    // capitalizeMock.mockRestore()
  })

  test('Second Test', () => {
    const capitalize = utils.capitalize('jonas')

    expect(capitalize).toEqual('Jonas')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
