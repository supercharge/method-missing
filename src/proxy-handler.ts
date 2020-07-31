'use strict'

export class CallThroughHandler<T extends object> {
  /**
   * The class instance this proxy handler is applied to.
   */
  private readonly class: T

  /**
   * The method name to call for missing methods.
   */
  private readonly method: string = '__call'

  /**
   * Create a new call through handler for the given `Class`.
   *
   * @param {class} Class
   */
  constructor (Class: T) {
    this.class = Class
  }

  /**
   * Returns the class name of the proxied instance.
   *
   * @returns {String}
   */
  className (): string {
    return this.class.constructor.name
  }

  /**
   * The trap for getting values on the given `target`.
   *
   * @param target
   * @param property
   *
   * @returns {*}
   */
  get<R> (target: any, property: string): R | Function {
    if (Reflect.has(target, property)) {
      return Reflect.get(target, property)
    }

    if (Reflect.has(target, this.method)) {
      return (...args: any[]) => {
        return target[this.method].call(this.class, property, args)
      }
    }

    throw new Error(`${this.className()}.${property} is not a function. Use the method ${this.method} in your class "${this.className()}" to catch and handle all calls.`)
  }
}
