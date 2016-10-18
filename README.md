# ApiBro

```js
import { default as ApiBro } from 'api-bro'

const client = new ApiBro({
  pathPrefix: 'https://path.to.your.api.endpoint',
  globalHeaders: {
    Authorization: `Bearer ${token}`
  }
})

client.get('apples', { params: { green: true, red: true } }).then(...)
client.post('apples/store', { data: { apples: [...] } })
client.patch ...
client.del ...
client.put ...
```

## Optional parameters

`pathPrefix` Add a prefixed string to each request.

`globalHeaders` Add headers to each request.

`globalParams` Add params to all applicable requests.

`globalData` Add data to all applicable requests
