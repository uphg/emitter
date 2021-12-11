interface EmitterCallback {
  (...args: unknown[]): unknown
  _?: (...args: unknown[]) => unknown
}

class Emitter {
  public events: { [key: string]: EmitterCallback[] } = {}
  on(name: string, callback: EmitterCallback) {
    const e = this.events
    e[name] = e[name] || []
    e[name]?.push(callback)
  }

  once(name: string, callback: EmitterCallback) {
    const listener = (...args: unknown[]) => {
      this.off(name, listener);
      callback(...args);
    }

    // record the original function
    listener._ = callback
    return this.on(name, listener)
  }

  emit(name: string, ...args: unknown[]) {
    const e = this.events
    if (!e[name]) return

    for (const callback of e[name] as EmitterCallback[]) {
      callback(...args)
    }
  }

  off(name: string, callback?: EmitterCallback) {
    const e = this.events
    if (!e[name]) return
    const newCache = []

    if (e[name] && callback) {
      for (const item of e[name] as EmitterCallback[]) {
        if (item === callback || item._ === callback) continue
        item && newCache.push(item)
      }
    }

    // prevent memory leaks
    (e[name]?.length) ? e[name] = newCache : delete e[name]
  }

  clear() {
    this.events = {}
  }
}

export default Emitter