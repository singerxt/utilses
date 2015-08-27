(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.utils = factory();
})(this, function () {
  'use strict';

  var utils = {
    greet: function greet() {
      return 'hello';
    }
  };

  return utils;
});
//# sourceMappingURL=utils.js.map