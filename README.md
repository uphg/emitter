# Emitter

实现一个轻量的 event emitter 库。

## 基本用法

```js
import Emitter from '@/uphg/emitter'
const emitter = new Emitter();

emitter.on('foo', function (p1, p2, p3) {
 // ...
});

emitter.emit('foo', 'p1', 'p2', 'p3');
```

