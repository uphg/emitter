type EmitterArgs = any[]

interface EmitterCallback {
  (...args: EmitterArgs): void
  _?: () => void
}

interface EmitterEvents {
  [key: string]: EmitterCallback[] | null
}

class Emitter {
  public events: EmitterEvents = {}
  on(name: string, callback: EmitterCallback) {
    const e = this.events
    if (!e[name]) {
      e[name] = [callback]
      return
    }
    e[name]?.push(callback)
  }

  once(name: string, callback: EmitterCallback) {
    const listener = (...args: EmitterArgs) => {
      this.off(name, listener);
      callback(...args);
    }

    // record the original function
    listener._ = callback
    return this.on(name, listener)
  }

  emit(name: string, ...args: EmitterArgs) {
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
    (e[name]?.length)
    ? e[name] = newCache
    : delete e[name]
  }

  clear() {
    this.events = {}
  }
}

export default Emitter