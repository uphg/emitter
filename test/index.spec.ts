import Emitter from '../src/index'

test('订阅一个事件', () => {
  const emitter = new Emitter()
  const fn = () => {}
  emitter.on('test', fn)
  expect(emitter.cache['test']).toEqual([fn])
})

test('触发一个事件', (done) => {
  const emitter = new Emitter()
  emitter.on('test', () => {
    done()
  })
  emitter.emit('test')
})

test('只触发一次事件', (done) => {
  const emitter = new Emitter()
  emitter.once('test', () => {
    expect(emitter.cache.test).toEqual([])
    done()
  })
  emitter.emit('test')
  emitter.emit('test')
})

test('可以传入多个参数', (done) => {
  const emitter = new Emitter()
  emitter.on('test', (p1, p2) => {
    expect(p1).toBe('hi')
    expect(p2).toBe('hello')
    done()
  })
  emitter.emit('test', 'hi', 'hello')
})

test('可以多次触发事件', () => {
  const emitter = new Emitter()
  const mockFn = jest.fn(() => {})
  emitter.on('test', mockFn)
  emitter.emit('test')
  emitter.emit('test')
  emitter.emit('test')
  expect(mockFn.mock.calls.length).toBe(3);
})

test('取消订阅的所有指定事件', () => {
  const emitter = new Emitter()
  const mockFn1 = jest.fn(() => {})
  const mockFn2 = jest.fn(() => {})
  emitter.on('test', mockFn1)
  emitter.on('test', mockFn2)
  emitter.off('test')
  emitter.emit('test')
  emitter.emit('test')
  expect(mockFn1.mock.calls.length).toBe(0);
  expect(mockFn2.mock.calls.length).toBe(0);
})

test('取消订阅的指定函数', () => {
  const emitter = new Emitter()
  const mockFn1 = jest.fn(() => {})
  const mockFn2 = jest.fn(() => {})
  emitter.on('test', mockFn1)
  emitter.on('test', mockFn2)
  emitter.off('test', mockFn1)
  emitter.emit('test')
  expect(mockFn1.mock.calls.length).toBe(0);
  expect(mockFn2.mock.calls.length).toBe(1);
})

test('取消多次订阅的指定函数', () => {
  const emitter = new Emitter()
  const mockFn1 = jest.fn(() => {})
  const mockFn2 = jest.fn(() => {})
  emitter.on('test', mockFn1)
  emitter.on('test', mockFn2)
  emitter.on('test', mockFn1)
  emitter.off('test', mockFn1)
  emitter.emit('test')
  expect(mockFn1.mock.calls.length).toBe(0);
  expect(mockFn2.mock.calls.length).toBe(1);
})

test('订阅的事件被调用时可以删除自身', (done) => {
  const emitter = new Emitter()
  emitter.on('test', () => {
    expect(emitter.cache['test'].length).toBe(1)
    emitter.off('test')
    expect(emitter.cache['test'].length).toBe(0)
    done()
  })
  emitter.emit('test')
})

test('即使在事件回调中取消订阅该函数，该函数也会执行', () => {
  const emitter = new Emitter()
  const mockFn = jest.fn(() => {
    emitter.off('test', mockFn)
  })
  emitter.on('test', mockFn)
  emitter.emit('test')
  expect(mockFn.mock.calls.length).toBe(1)
})

test('添加事件之前取消事件什么都不做', (done) => {
  const emitter = new Emitter()
  emitter.off('test', () => {})
  done()
})

test('发布没有订阅的事件', (done) => {
  const emitter = new Emitter()
  emitter.emit('test', 'hi')
  done()
})

test('取消只订阅一次的事件', () => {
  const emitter = new Emitter()
  const mockFn = jest.fn(() => {})
  emitter.once('test', mockFn)
  emitter.off('test', mockFn)
  emitter.emit('test')
  expect(mockFn.mock.calls.length).toBe(0)
})

test('Emitter 是一个函数', () => {
  expect(Emitter).toBeInstanceOf(Function)
})

test('使用 Emitter 构造的对象继承了 Emitter 实例', () => {
  const emitter = new Emitter()
  expect(emitter).toBeInstanceOf(Emitter)
})

test('使用 Emitter 构造的对象应包括 on、once、emit、off、clear 方法', () => {
  const eventBus = new Emitter()
  expect(eventBus.on).toBeInstanceOf(Function)
  expect(eventBus.once).toBeInstanceOf(Function)
  expect(eventBus.emit).toBeInstanceOf(Function)
  expect(eventBus.off).toBeInstanceOf(Function)
  expect(eventBus.clear).toBeInstanceOf(Function)
})
