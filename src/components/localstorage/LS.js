/**
 *
 */

class LS {

  constructor() {
    this._ls = window.localStorage;
    this._listening = false;
    this._listeners = {};
  }

  set(key, val) {

    if (val === undefined) {
      return this.remove(key);
    }

    let oldValue = this.get(key);
    this._ls.setItem(key, this._serialize(val));

    setTimeout(this._change.call(this ,{
      oldValue: oldValue,
      newValue: val,
      url: window.location,
      key: key
    }), 0);

    return val;
  }

  get(key, defaultVal) {
    let val = this._deserialize(this._ls.getItem(key));

    setTimeout(this._change.call(this ,{
      oldValue: val,
      newValue: val,
      url: window.location,
      key: key
    }), 0);

    return val;
  }

  remove(key) {
    this._ls.removeItem(key);
  }

  clear() {
    this._ls.clear();
  }

  getAll() {
    var ret = {};

    this.forEach(function(key, val) {
      ret[key] = val;
    });

    return ret;
  }

  forEach(callback) {
    let key;

    for (let i = 0; i < this._ls.length; i++) {
      key = this._ls.key(i);
      callback(key, this.get(key));
    }
  }

  _listen() {
    if (window.addEventListener) {document.addEventListener('storage', this._change.bind(this), false);}
    if (window.attachEvent) {document.attachEvent('storage', this._change.bind(this), false);}
  }

  _change(e) {
    let all;
    let fire = (listener) => {
      listener(e.newValue, e.oldValue, e.url || e.uri);
    };

    if (this._listeners === undefined) {
      return;
    }

    if (!e) {
      e = window.event;
    }

    all = this._listeners[e.key];

    if (all) {
      all.forEach(fire);
    }
  }

  on(key, callback) {

    if (this._listeners[key]) {
      this._listeners[key].push(callback);
    } else {
      this._listeners[key] = [callback];
    }

    if (!this._listening) {
      this._listen();
    }
  }

  off(key, callback) {
    let ns = this._listeners[key];

    if (ns.lenght > 1) {
      ns.splice(ns.indexOf(fn), 1);
    } else {
      this._listeners[key] = [];
    }

  }

  _serialize(value) {
    return JSON.stringify(value);
  }

  _deserialize(value) {
    if (typeof value !== 'string') {
      return undefined;
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      return value || undefined;
    }
  }
}

export {LS};
