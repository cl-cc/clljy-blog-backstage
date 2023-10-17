class Ajax {

  constructor(options) {
    this.options = { data: null, method: 'GET', responseType: 'json', ...options };
  }

  send({ callback, error, options }) {
    const { data, method, url, responseType } = Object.assign({}, this.options, options);
    const xhr = new XMLHttpRequest();

    xhr.responseType = responseType;

    xhr.open(method, url);

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    data !== null && xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
    xhr.addEventListener('load', function () {
      const { status, response } = this;
      if (status === 200 && callback && typeof callback === 'function') {
        callback(response)
      }
    });

    xhr.addEventListener('progress', function (event) {
      // console.log('event', event)
    });

    xhr.addEventListener('error', function (err) {
      error(err)
    });

    xhr.send(JSON.stringify(data));
  }

  set url(url) {
    this.options.url = url;
  }

  get url() {
    return this.options.url;
  }

}

const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const getSign = (data) => {
  var skey = '5f8b53b10f0178856dc44986b36a673b'
  var params = []
  params = data.sort((a, b) => {
    return (a + '').localeCompare(b + '')
  })
  params = params.join('').replace(/\=/g, '') + skey
  return md5(params, 32)
}

const getTimestamp = () => {
  return new Date().getTime()
}