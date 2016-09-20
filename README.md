# ApiBro

```
const client = new ApiBro({
  pathPrefix: 'https://path.to.your.api.endpoint',
  globalHeaders: {
    Authorization: `Bearer ${token}`
  }
})

client.get('apples', { params: { green: true, red: true } })
    .then(apples => display(apples))
    .catch(err => oops(err))

client.post('apples/store', { data: { apples: [...] } })
    .then(response => display(response))
    .catch(err => oops(err))

client.patch ...
client.del ...
client.put ...
```
