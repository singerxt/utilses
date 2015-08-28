# local storage component

A simplified API ```localStorage``` with Objects support (with JSON) and on write/read event for all tabs.

# API

The API is simplified way to interact with all things ```localStorage``` note this is just wrapper + some features
This component won't work in browser where localStorage is not supported.

## LS.set(key, value)

```javascript
import {LS} from './components/localstorage/LS.js';
let _ls = new LS();

_ls.set('key', 'value');
// <- value

__ls.set('key');

// <- undefined key is cleared.

```

## LS.get(key)

```javascript
import {LS} from './components/localstorage/LS.js';
let _ls = new LS();

_ls.get('key');

// <- value

```

## LS.remove(key);

```javascript
import {LS} from './components/localstorage/LS.js';
let _ls = new LS();

_ls.remove('key');

// <- undefined

```

## LS.clear();

```javascript
import {LS} from './components/localstorage/LS.js';
let _ls = new LS();

_ls.clear();

// <- undefined

```

## LS.getAll();

```javascript
import {LS} from './components/localstorage/LS.js';
let _ls = new LS();

_ls.getAll();

// <-- Object
```

## LS.forEach(callback);

```javascript
import {LS} from './components/localstorage/LS.js';
let _ls = new LS();

_ls.forEach((value) => {
  console.log(value);
});

```

## LS.on('key', callback);

```javascript
import {LS} from './components/localstorage/LS.js';
let _ls = new LS();

_ls.set('testable', 'test');

_ls.on('testable', function (e) {
  console.log(e);
  // <-- {
    oldValue: 'test',
    newValue: 'test1',
    url: localhost,
    key: key
  }
});

_ls.set('testable', 'test1');
```

## LS.off('key');

```


```

