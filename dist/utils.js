var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.utils = factory();
})(this, function () {
  'use strict';

  /*global window*/
  /**
   *
   */

  var LS = (function () {
    function LS() {
      _classCallCheck(this, LS);

      this._ls = window.localStorage;
      this._listening = false;
      this._listeners = {};
    }

    _createClass(LS, [{
      key: 'set',
      value: function set(key, val) {

        if (val === undefined) {
          return this.remove(key);
        }

        var oldValue = this.get(key);
        this._ls.setItem(key, this._serialize(val));

        setTimeout(this._change.call(this, {
          oldValue: oldValue,
          newValue: val,
          url: window.location,
          key: key
        }), 0);

        return val;
      }
    }, {
      key: 'get',
      value: function get(key, defaultVal) {
        setTimeout(this._change, 0);
        return this._deserialize(this._ls.getItem(key));
      }
    }, {
      key: 'remove',
      value: function remove(key) {
        this._ls.removeItem(key);
      }
    }, {
      key: 'clear',
      value: function clear() {
        this._ls.clear();
      }
    }, {
      key: 'getAll',
      value: function getAll() {
        var ret = {};

        this.forEach(function (key, val) {
          ret[key] = val;
        });

        return ret;
      }
    }, {
      key: 'forEach',
      value: function forEach(callback) {
        var key = undefined;

        for (var i = 0; i < this._ls.length; i++) {
          key = this._ls.key(i);
          callback(key, this.get(key));
        }
      }
    }, {
      key: '_listen',
      value: function _listen() {
        if (window.addEventListener) {
          document.addEventListener('storage', this._change.bind(this), false);
        }
        if (window.attachEvent) {
          document.attachEvent('storage', this._change.bind(this), false);
        }
        console.log('bind!');
      }
    }, {
      key: '_change',
      value: function _change(e) {
        var fire = function fire(listener) {
          listener(e.newValue, e.oldValue, e.url || e.uri);
        };

        if (this._listeners === undefined) {
          return;
        }

        if (!e) {
          e = window.event;
        }

        var all = this._listeners[e.key];

        if (all) {
          all.forEach(fire);
        }
      }
    }, {
      key: 'on',
      value: function on(key, callback) {
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
    }, {
      key: 'off',
      value: function off(key, callback) {
        var ns = this._listeners[key];

        if (ns.lenght > 1) {
          ns.splice(ns.indexOf(fn), 1);
        } else {
          this._listeners[key] = [];
        }
      }
    }, {
      key: '_serialize',
      value: function _serialize(value) {
        return JSON.stringify(value);
      }
    }, {
      key: '_deserialize',
      value: function _deserialize(value) {
        if (typeof value !== 'string') {
          return undefined;
        }

        try {
          return JSON.parse(value);
        } catch (e) {
          return value || undefined;
        }
      }
    }]);

    return LS;
  })();

  var utils = {
    greet: function greet() {
      return 'hello';
    }
  };

  var utils___ls = new LS();

  window._ls = utils___ls;

  return utils;
});
//# sourceMappingURL=utils.js.map