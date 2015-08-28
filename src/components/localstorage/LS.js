/*global window*/
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

    this._ls.setItem(key, this._serialize(val));

    return val;
  }

  get(key, defaultVal) {
    return this._deserialize(this._ls.getItem(key));
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
    console.log('bind!');
  }

  _change(e) {
    let fire = (listener) => {
      listener(JSON.parse(e.newValue), JSON.parse(e.oldValue), e.url || e.uri);
    };

    console.log('_change');
    if (!e) {
      e = window.event;
    }

    let all = this._listeners(e.key);

    if (all) {
      all.forEach(fire);
    }
  }

  on(key, callback) {
    if (this._listeners[key]) {
      this._listeners[key].push(callback);
      console.log(this._listeners);
    } else {
      this._listeners[key] = [callback];
      console.log(this._listeners);
    }

    if (!this._listening) {
      this._listen();
      console.log('to wazne wykonalo sie');
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
