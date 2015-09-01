import {LS} from './components/localstorage/LS.js';

const utils = {
  greet() {
    return 'hello';
  },

  _ls() {
    return new LS;
  }
};

let _ls = new LS();

window._ls = _ls;

export default utils;

