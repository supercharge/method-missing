'use strict'

import { CallThroughHandler } from './proxy-handler'

export class MethodMissing {
  constructor () {
    return new Proxy(this, new CallThroughHandler(this))
  }
}
