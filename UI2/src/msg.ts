class MSG {
  private cache: Map<String, any> = new Map();
  constructor() {
    /*@ts-ignore*/
    if (!window.chrome || !window.chrome.webview) {
      return;
    }
    /*@ts-ignore*/
    window.chrome.webview.addEventListener("message", this.onMessage.bind(this));
  }
  private onMessage(event: any) {
    const msg = event.data;
    if (msg.id && this.cache.has(msg.id)) {
      if (msg.error) {
        this.cache.get(msg.id).reject(msg.error);
      } else {
        this.cache.get(msg.id).resolve(msg.result);
      }
      this.cache.delete(msg.id);
    } else if (msg.eventName) {
      this.emit(msg.eventName, msg);
    }
  }
  invoke(method: String, args?: any) {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(8).substring(2);
      const msg = { id, method, args };
      this.cache.set(id, { resolve, reject });
      /*@ts-ignore*/
      if (!window.chrome || !window.chrome.webview) {
        return;
      }
      /*@ts-ignore*/
      window.chrome.webview.postMessage(msg);
    });
  }
  on(eventName: String, listener: Function) {
    let arr = this.cache.get(eventName);
    if (arr) {
      arr.push(listener);
    } else {
      this.cache.set(eventName, [listener]);
    }
  }
  off(eventName: String, listener: Function) {
    let arr = this.cache.get(eventName);
    if (arr) {
      this.cache.set(
        eventName,
        arr.filter((item) => item != listener),
      );
    }
  }
  once(eventName: String, listener: Function) {
    const onceListener = (arg: any) => {
      listener(arg);
      this.off(eventName, onceListener);
    };
    this.on(eventName, onceListener);
  }
  emit(eventName: String, data?: any) {
    const listeners = this.cache.get(eventName);
    if (!listeners) return;
    for (const listener of [...listeners]) {
      listener(data);
    }
  }
}

export default new MSG();
