
class HTTP {

  constructor() {

  }

  get config() {
    return {
      APPLICATION_JSON: 'application/json',
      CONTENT_TYPE_APPLICATION_JSON: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      JSON_START: /^\[|^\{(?!\{)/,
      JSON_ENDS: {
        '[': /]$/,
        '{': /}$/
      }
    };
  }

  _serializeValue(value) {
    if (value) {
      return isDate(value) ? value.toISOString() : JSON.parse(value);
    }

    return value;
  }

  $get(url, params) {
    return new Promise(function (resolve, reject) {

    });
  }

  _doCall(url, type) {
    return ;
  }
}

