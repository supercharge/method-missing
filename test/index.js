'use strict'

const MethodMissing = require('..')

describe('Method Missing', () => {
  it('extends a class', async () => {
    expect(new User()).toBeInstanceOf(User)
    expect(new User()).toBeInstanceOf(MethodMissing)
  })

  it('calls existing methods', async () => {
    expect(
      await new CallThroughUser('Marcus').name()
    ).toEqual('Marcus')
  })

  it('calls through', async () => {
    expect(
      new CallThroughUser().unavailableMethod()
    ).toEqual('unavailableMethod')
  })

  it('calls through async', async () => {
    expect(
      await new AsyncCallThroughUser().unavailableAsyncMethod()
    ).toEqual('unavailableAsyncMethod')
  })

  it('throws when not implementing a __call method', async () => {
    expect(() => {
      return new User().unavailableMethod()
    }).toThrow()
  })
})

class User extends MethodMissing {
  constructor (name) {
    super()

    this.name = name
  }

  async name () {
    return this.name
  }
}

class CallThroughUser extends MethodMissing {
  constructor (name) {
    super()

    this._name = name
  }

  __call (methodName) {
    return methodName
  }

  async name () {
    return this._name
  }
}

class AsyncCallThroughUser extends MethodMissing {
  constructor (name) {
    super()

    this._name = name
  }

  async __call (methodName) {
    return methodName
  }

  async name () {
    return this._name
  }
}
