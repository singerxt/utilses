import {LS} from './components/localstorage/LS.js';

const utils = {
  greet() {
    return 'hello';
  }
};

let _ls = new LS();

window._ls = _ls;

export default utils;

