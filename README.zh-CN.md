# Emitter

简体中文 | [English](./README.md)

一个很小的 event emitter 库。

## 安装

使用 npm 安装

```sh
npm i small-emitter
# or yarn add small-emitter
```

在项目中导入

```js
// ES6 modules
import Emitter from 'small-emitter'

// CommonJS modules
const Emitter = require('small-emitter')
```

## 用法

```js
import Emitter from 'small-emitter'
const emitter = new Emitter();

// 订阅事件
emitter.on('foo', function (p1, p2, p3) {
 // ...
});

// 只订阅一次事件
emitter.once('foo', function (p1, p2, p3) {
 // ...
});

// 发布事件
emitter.emit('foo', 'p1', 'p2', 'p3');

// 清空所有事件
emitter.clear()

// 使用函数引用
function fn() {}
emitter.on('foo', fn)
emitter.off('foo', fn)
```

## API

### `on(name: string, callback: () => void)`

- **参数**

  - `name` 事件名
  - `callback` 事件的回调函数

- **示例**

  ```js
  const emitter = new Emitter()

  emitter.on('foo', (data) => {
    console.log(data)
  })

  emitter.emit('foo', 1) // 1
  emitter.emit('foo', 2) // 2
  ```

### `once(name: string, callback: () => void)`

- **参数**

  - `name` 事件名
  - `callback` 事件的回调函数

- **示例**

  ```js
  const emitter = new Emitter()

  emitter.once('foo', (data) => {
    // 这个函数只会执行一次
    console.log(data)
  })

  emitter.emit('foo', 'a') // 'a'
  emitter.emit('foo', 'b') // Not output
  ```

### `emit(name: string, ...args: any[])`

- **参数**

  - `name` 事件名
  - `...args (optional)` 执行事件时传入的参数

- **示例**

  ```js
  const emitter = new Emitter()

  emitter.once('bar', (message, name) => {
    console.log(`${message}, ${name}`)
  })

  emitter.emit('bar', 'hi', 'Jack') // hi, Jack
  ```

### `off(name: string, callback?: () => void)`

- **参数**

  - `name` 事件名
  - `callback (optional)` 需要清除的函数或函数引用

- **示例**

  ```js
  const emitter = new Emitter()

  const fn = (message) => {
    console.log(message)
  }

  emitter.on('bar', fn)
  emitter.emit('bar', 'hi') // hi
  emitter.off('bar', fn)
  emitter.emit('bar', 'Jack') // Not output
  ```

### `clear()`

- 调用此方法将清除所有事件

- **示例**

  ```js
  const emitter = new Emitter()

  emitter.on('foo', (value) => {
    console.log(value)
  })

  emitter.on('bar', (value) => {
    console.log(value)
  })

  emitter.emit('foo', 'hi, foo')
  emitter.emit('bar', 'hi, bar') // hi, bar
  emitter.clear()
  emitter.emit('foo', 'hi, Jack') // Not output
  emitter.emit('bar', 'hi, Tom') // Not output
  ```
