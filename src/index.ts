export class Emitter {
  public events: { [key: string]: Function[] } = {}
  on<T extends Function>(name: string, callback: T) {
    const e = this.events
    e[name] = e[name] || []
    e[name]?.push(callback)
  }

  once<T extends Function>(name: string, callback: T) {
    const listener = (...args: unknown[]) => {
      this.off(name, listener);
      callback(...args);
    }

    // record the original function
    listener._ = callback
    return this.on(name, listener)
  }

  emit<T extends unknown[]>(name: string, ...args: T) {
    const e = this.events
    if (!e[name]) return

    for (const callback of e[name]) {
      callback(...args)
    }
  }

  off<T extends Function>(name: string, callback?: T) {
    const e = this.events
    if (!e[name]?.length) return
    
    if (callback) {
      const newCache = []
      for (const item of e[name]) {
        if (item === callback || (item as unknown as { _: Function })._ === callback) continue
        item && newCache.push(item)
      }
      e[name] = newCache
    } else {
      delete e[name]
    }
  }

  clear() {
    this.events = {}
  }
}

export const useEmitter = () => new Emitter()
