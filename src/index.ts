type EmitterArgs = any[]

interface EmitterCallback {
  (...args: EmitterArgs): void
  _?: () => void
}

interface EmitterCache {
  [key: string]: EmitterCallback[] | null
}

class Emitter {
  private cache: EmitterCache = {}
  on(name: string, callback: EmitterCallback) {
    if (!this.cache[name]) {
      this.cache[name] = [callback]
      return
    }
    this.cache[name]?.push(callback)
  }

  once(name: string, callback: EmitterCallback) {
    const listener = (...args: EmitterArgs) => {
      this.off(name, listener);
      callback(...args);
    }

    // 记录原函数，在执行 off 时清除（on/once 同时清除）
    listener._ = callback
    return this.on(name, listener)
  }

  emit(name: string, ...args: EmitterArgs) {
    if (!this.cache[name]) return

    this.cache[name]?.forEach((callback) => {
      callback?.(args)
    })
  }

  off(name: string, callback: EmitterCallback) {
    if (!this.cache[name]) return
    const newCache = []
    for(const item of this.cache[name] as EmitterCallback[]) {
      if (item === callback || item._ === callback) continue
      item && newCache.push(item)
    }

    // 防止内存泄漏
    (this.cache[name]?.length)
    ? this.cache[name] = newCache
    : delete this.cache[name]
  }

  clear() {
    this.cache = {}
  }
}

export default Emitter