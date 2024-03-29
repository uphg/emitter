# Emitter

English | [简体中文](./README.zh.md)

A small event emitter library.

## Install

Install with npm

```sh
npm i small-emitter
# or pnpm add small-emitter
```

Import in the project

```js
// ES6 modules
import { Emitter } from 'small-emitter'

// CommonJS modules
const { Emitter } = require('small-emitter')
```

## Usage

```js
import { Emitter } from 'small-emitter'
const emitter = new Emitter();

// subscribe to events
emitter.on('foo', function (p1, p2, p3) {
 // ...
});

// subscribe the event only once
emitter.once('foo', function (p1, p2, p3) {
 // ...
});

// publish events
emitter.emit('foo', 'p1', 'p2', 'p3');

// clearing all events
emitter.clear()

// use reference functions
function fn() {}
emitter.on('foo', fn)
emitter.off('foo', fn)
```

## API

### `on<T extends Function>(name: string, callback: T)`

**Arguments**

- `name` name of the event
- `callback` event's callback function

**Example**

```js
const emitter = new Emitter()

emitter.on('foo', (data) => {
  console.log(data)
})

emitter.emit('foo', 1) // 1
emitter.emit('foo', 2) // 2
```

### `once<T extends Function>(name: string, callback: T)`

**Arguments**

- `name` name of the event
- `callback` event's callback function

**Example**

```js
const emitter = new Emitter()

emitter.once('foo', (data) => {
  // The function will only be executed once
  console.log(data)
})

emitter.emit('foo', 'a') // 'a'
emitter.emit('foo', 'b') // Not output
```

### `emit<T extends unknown[]>(name: string, ...args: T)`

**Arguments**

- `name` name of the event
- `...args (optional)` parameters passed in by the execution event

**Example**

```js
const emitter = new Emitter()

emitter.once('bar', (message, name) => {
  console.log(`${message}, ${name}`)
})

emitter.emit('bar', 'hi', 'Jack') // hi, Jack
```

### `off<T extends Function>(name: string, callback?: T)`

**Arguments**

- `name` name of the event
- `callback (optional)` functions that need to be cleared or function reference

**Example**

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

Calling this method will clear all events

**Example**

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

## License

[MIT License](https://opensource.org/licenses/MIT)
