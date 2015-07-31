import 'whatwg-fetch'

export default class ApiBro {

    constructor(location='', headers) {
        this.location = location
        this.headers = headers || {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    fullPath(path='') {
        return `${this.location}${path}`
    }

    service(type, path, data) {
        return new Promise((resolve, reject) => {
            const request = {
                method: type,
                headers: this.headers,
                body: type === 'post' ? JSON.stringify(data) : null
            }
            fetch(path, request)
                .then(res => res.status == 200 ? res.json() : null)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

    get(path='', data={}) {
        return this.service('get', this.fullPath(path), data)
    }

    post(path='', data={}) {
        return this.service('post', this.fullPath(path), data)
    }
}