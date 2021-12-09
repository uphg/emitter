# Emitter

A small event emitter library.

## Usage

```js
import Emitter from 'tulp-emitter'
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

