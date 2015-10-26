# Superserver [![NPM version][npm-image]][npm] [![Build Status][travis-image]][travis] [![Coverage Status][cover-image]][cover] [![Climate Status][climate-image]][climate]

> a dummy REST server for testing HTTP client

[DEMO](http://superserver.berabou.me/)

## Installation

```bash
$ npm install superserver --global
```

# CLI

Always returns by JSON.stringify the `request` object of [requestListener](https://nodejs.org/api/http.html).
And add a summary of request: `.originalUrl`, `.query`,`.body`,`.data`.

```bash
$ superserver 8080
# Server running at http://localhost:8080/

$ curl http://localhost:8080/\?foo\=bar --data '{"baz":"beep"}' > request.json
```

`request.json`

```json
{
  "headers": {
    "host": "localhost:8080",
    "user-agent": "curl/7.43.0",
    "accept": "*/*",
    "content-length": "14",
    "content-type": "application/x-www-form-urlencoded"
  },
  "url": "/?foo=bar",
  "method": "POST",
  "originalUrl": "http://localhost:8080/?foo=bar",
  "query": {
    "foo": "bar"
  },
  "body": "{\"baz\":\"beep\"}",
  "data": {
    "baz": "beep"
  }
  // ...
}
```

# API

## superserver.listen(port,callback)
## superserver.close(callback)

Start the superserver on the specified `port`

```js
import superserver from 'superserver'

const port= 59798
superserver.listen(port,()=>{
  console.log('Server running at http://localhost:%s/',port)
})
```

License
---
[MIT][License]

[License]: http://59naga.mit-license.org/

[sauce-image]: http://soysauce.berabou.me/u/59798/superserver.svg
[sauce]: https://saucelabs.com/u/59798
[npm-image]:https://img.shields.io/npm/v/superserver.svg?style=flat-square
[npm]: https://npmjs.org/package/superserver
[travis-image]: http://img.shields.io/travis/59naga/superserver.svg?style=flat-square
[travis]: https://travis-ci.org/59naga/superserver
[cover-image]: https://img.shields.io/codeclimate/github/59naga/superserver.svg?style=flat-square
[cover]: https://codeclimate.com/github/59naga/superserver/coverage
[climate-image]: https://img.shields.io/codeclimate/coverage/github/59naga/superserver.svg?style=flat-square
[climate]: https://codeclimate.com/github/59naga/superserver
