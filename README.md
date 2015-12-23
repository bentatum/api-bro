# ApiBro

```
// api.js
export default new ApiBro('https://path.to.your.api.net/')
```

```
// app.js
import api from './api'

api.get('apples', { green: true, red: true })
    .then(apples => display(apples))
    .catch(err => oops(err))

api.post('apples/store', { apples: [...] })
    .then(response => display(response))
    .catch(err => oops(err))
```