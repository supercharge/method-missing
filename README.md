<div align="center">
  <a href="https://superchargejs.com">
    <img width="471" style="max-width:100%;" src="https://superchargejs.com/images/supercharge-text.svg" />
  </a>
  <br/>
  <br/>
  <p>
    <h3>Method Missing</h3>
  </p>
  <p>
    Handle missing methods on your classes, like <a href="https://www.php.net/manual/en/language.oop5.overloading.php#object.call">PHP’s __call</a>.
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#Docs"><strong>Docs</strong></a> ·
    <a href="#usage"><strong>Usage</strong></a>
  </p>
  <br/>
  <br/>
  <p>
    <a href="https://www.npmjs.com/package/@supercharge/method-missing"><img src="https://img.shields.io/npm/v/@supercharge/method-missing.svg" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@supercharge/method-missing"><img src="https://img.shields.io/npm/dm/@supercharge/method-missing.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> and <a href="http://twitter.com/superchargejs">@superchargejs</a> for updates!</em>
  </p>
</div>

---

## Introduction
The `@supercharge/method-missing` package allows you to handle missing methods in your JavaScript classes. It calls the `__call(methodName, args)` method in your class when trying to invoke a missing method.


## Installation

```
npm i @supercharge/method-missing
```


## Docs
Find all the [details for `@supercharge/method-missing` in the extensive Supercharge docs](https://superchargejs.com/docs/pipeline).


## Usage
Using `@supercharge/method-missing` is pretty straightforward. The package exports a class that you must extend in your implemented class. Then, add a `__call(methodName, args)` method to your class. The `__call` method allows you to handle all calls for methods that are not existent in your class.

I guess an example clears things up:

```js
const MethodMissing = require('@supercharge/method-missing')

class QueryInterface extends MethodMissing {
  /**
   * Creates an instance wrapping the Sequelize `queryInterface` instance.
   *
   * @param {QueryInterface} queryInterface
   */
  constructor (queryInterface) {
    super()

    this.queryInterface = queryInterface
  }

  /**
   * Determine whether the given `column` already exists in the given `table`.
   *
   * @param {String} table
   * @param {String} column
   *
   * @returns {Boolean}
   */
  async hasColumn(tableName, columnName) {
    const description = await this.queryInterface.describeTable(tableName)

    return !!description[columnName]
  }


  /**
   * Pass through all calls to the original query interface.
   *
   * @param {String} methodName
   * @param {Array} args
   *
   * @returns {*}
   */
  __call(methodName, args) {
    return this.queryInterface[methodName](...args)
  }
}
```


## Contributing
Do you miss a function? We very much appreciate your contribution! Please send in a pull request 😊

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License
MIT © [Supercharge](https://superchargejs.com)

---

> [superchargejs.com](https://superchargejs.com) &nbsp;&middot;&nbsp;
> GitHub [@supercharge](https://github.com/supercharge) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
