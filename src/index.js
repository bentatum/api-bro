import 'whatwg-fetch'
import queryString from 'query-string'

export default class ApiBro {

    constructor(location='', headers={}) {
        this.location = location
        this.headers = headers
    }

    fullPath(path='') {
        return `${this.location}${path}`
    }

    parseServicePath(path, type, data=null) {
        return type === 'get'
            ? (data ? `${path}?${queryString.stringify(data)}` : path)
            : path
    }

    service(type, path, data=null) {
        path = this.parseServicePath(path, type, data)
        return new Promise((resolve, reject) => {
            let request = {
                method: type,
                headers: this.headers,
            }
            if (type === 'post') {
                request.body = JSON.stringify(data)
            }
            fetch(path, request)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }


    get(path='', data=null) {
        return this.service('get', this.fullPath(path), data)
    }

    post(path='', data={}) {
        return this.service('post', this.fullPath(path), data)
    }
}
