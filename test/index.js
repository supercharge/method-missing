'use strict'

const Lab = require('@hapi/lab')
const MethodMissing = require('..')
const { expect } = require('@hapi/code')

const { describe, it } = (exports.lab = Lab.script())

describe('Method Missing', () => {
  it('extends a class', async () => {
    expect(new User()).to.be.instanceOf(User)
    expect(new User()).to.be.instanceOf(MethodMissing)
  })

  it('calls existing methods', async () => {
    expect(
      await new CallThroughUser('Marcus').name()
    ).to.equal('Marcus')
  })

  it('calls through', async () => {
    expect(
      new CallThroughUser().unavailableMethod()
    ).to.equal('unavailableMethod')
  })

  it('calls through async', async () => {
    expect(
      await new AsyncCallThroughUser().unavailableAsyncMethod()
    ).to.equal('unavailableAsyncMethod')
  })

  it('throws when not implementing a __call method', async () => {
    expect(() => {
      return new User().unavailableMethod()
    }).to.throw()
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
