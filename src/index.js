import 'whatwg-fetch'
import queryString from 'query-string'

export default class ApiBro {

    constructor(location='', headers={}, authToken) {
        this.location = location
        this.headers = headers
        this.authToken = authToken
    }

    fullPath(path='') {
        return `${this.location}${path}`
    }

    parseServicePath(path, type, data=null) {
        return type === 'get'
            ? (data ? `${path}?${queryString.stringify(data)}` : path)
            : path
    }

    buildHeaders() {
        if (this.authToken) {
            this.headers['Authorization'] = `Bearer ${this.authToken()}`
        }
        return this.headers
    }

    service(type, path, data=null) {
        path = this.parseServicePath(path, type, data)
        return new Promise((resolve, reject) => {
            let request = {
                method: type,
                headers: this.buildHeaders(),
            }
            if (type === 'post') {
                request.body = JSON.stringify(data)
            }
            fetch(path, request)
                .then(res => res.ok 
                    ? resolve(res.json())
                    : reject(res.json())
                )
                .catch(error => reject({ error }))
        })
    }


    get(path='', data=null) {
        return this.service('get', this.fullPath(path), data)
    }

    post(path='', data={}) {
        return this.service('post', this.fullPath(path), data)
    }
}
