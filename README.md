# ApiBro

```js
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
