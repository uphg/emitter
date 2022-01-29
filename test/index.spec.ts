import Emitter from '../src/index'

test('Emitter is a function', () => {
  expect(typeof Emitter === 'function').toBe(true)
})

test('inherited the Emitter instance', () => {
  const emitter = new Emitter()
  expect(emitter).toBeInstanceOf(Emitter)
})

test('Objects include on, once, emit, off, and clear methods', () => {
  const eventBus = new Emitter()
  expect(typeof eventBus.on === 'function').toBe(true)
  expect(typeof eventBus.once === 'function').toBe(true)
  expect(typeof eventBus.emit === 'function').toBe(true)
  expect(typeof eventBus.off === 'function').toBe(true)
  expect(typeof eventBus.clear === 'function').toBe(true)
})

test('subscribe to an event', () => {
  const emitter = new Emitter()
  const fn = () => {}
  emitter.on('test', fn)
  expect(emitter.events['test']).toEqual([fn])
})

test('publish to an event', (done) => {
  const emitter = new Emitter()
  emitter.on('test', () => {
    done()
  })
  emitter.emit('test')
})

test('subscribe the event only once', (done) => {
  const emitter = new Emitter()
  emitter.once('test', () => {
    expect(emitter.events.test).toEqual([])
    done()
  })
  emitter.emit('test')
  emitter.emit('test')
})

test('pass in multiple parameters', (done) => {
  const emitter = new Emitter()
  emitter.on('test', (p1, p2) => {
    expect(p1).toBe('hi')
    expect(p2).toBe('hello')
    done()
  })
  emitter.emit('test', 'hi', 'hello')
})

test('trigger event multiple times', () => {
  const emitter = new Emitter()
  const mockFn = jest.fn(() => {})
  emitter.on('test', mockFn)
  emitter.emit('test')
  emitter.emit('test')
  emitter.emit('test')
  expect(mockFn.mock.calls.length).toBe(3);
})

test('unsubscribe all specified events', () => {
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

test('the specified function for unsubscribing', () => {
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

test('cancel the specified function of multiple subscriptions', () => {
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

test('you can delete itself when the subscribed event is called', (done) => {
  const emitter = new Emitter()
  emitter.on('test', () => {
    expect(emitter.events['test'].length).toBe(1)
    emitter.off('test')
    expect(emitter.events['test'].length).toBe(0)
    done()
  })
  emitter.emit('test')
})

test('unsubscribe will also be executed', () => {
  const emitter = new Emitter()
  const mockFn = jest.fn(() => {
    emitter.off('test', mockFn)
  })
  emitter.on('test', mockFn)
  emitter.emit('test')
  expect(mockFn.mock.calls.length).toBe(1)
})

test('cancel before adding event, do nothing', (done) => {
  const emitter = new Emitter()
  emitter.off('test', () => {})
  done()
})

test('publish events that are not subscribed', (done) => {
  const emitter = new Emitter()
  emitter.emit('test', 'hi')
  done()
})

test('cancel an event that is only subscribed once', () => {
  const emitter = new Emitter()
  const mockFn = jest.fn(() => {})
  emitter.once('test', mockFn)
  emitter.off('test', mockFn)
  emitter.emit('test')
  expect(mockFn.mock.calls.length).toBe(0)
})

test('on is used together with once', () => {
  const emitter = new Emitter()
  const mockFn = jest.fn(() => {})
  emitter.once('test', mockFn)
  emitter.on('test', mockFn)
  emitter.off('test', mockFn)
  emitter.emit('test')
  expect(mockFn.mock.calls.length).toBe(0)
})
