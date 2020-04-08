const Person = require('../src/Person')
const utils = require('../src/utils')

// jest.mock('../src/Person')

describe('Example Tests', () => {
  test('utils formatName test', () => {
    const capitalizeMock = jest.spyOn(utils, 'capitalize').mockReturnValue('John')

    const formattedName = utils.formatName('john')

    expect(capitalizeMock).toHaveBeenCalled()
    expect(formattedName).toEqual('Name: John')
  })

  test('utils capitalize test', () => {
    const capitalize = utils.capitalize('jonas')

    expect(capitalize).toEqual('Jonas')
  })

  test('Person constructor test', () => {
    jest.spyOn(Person.prototype, 'setFullName').mockImplementation()

    const person = new Person('Jonas', 'Pohren')

    expect(person.setFullName).toHaveBeenCalled()
  })

  test('Person setFullName test', () => {
    const spy = jest.spyOn(Person.prototype, 'setFullName').mockImplementation()

    const person = new Person()

    spy.mockRestore()

    jest.spyOn(Person.prototype, 'setFullName')

    person.setFullName('Jonas', 'Pohren')

    expect(person.setFullName).toHaveBeenCalledTimes(1)
    expect(person.name).toEqual('Jonas Pohren')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
