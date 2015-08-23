# ApiBro

## Setup
Create new api configuration file somewhere in your project. Inside, you can configure and export an Api object for use throughout your application.
```
// Api.js
export default new ApiBro('https://path.to.your.api.net/')
```

## Use
```
// MyApp.js
import Api from './Api'

Api.get('apples', { green: true, red: true })
    .then(res => doSomethingWithResponse(res))
    .catch(error => displayError(error))

Api.post('apples/save', { bushels: 2 })
    .then(res => showNewApplesToUser(res))
    .catch(error => displayError(error))
```