import 'whatwg-fetch'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': ''
    // 'Host': '',
}

function service(type, path, data) {
    return new Promise((resolve, reject) => {
        const request = {
            method: type,
            headers: headers,
            body: type === 'post' ? JSON.stringify(data) : null
        }
        fetch(path, request)
            .then(res => res.status == 200 ? res.json() : null)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export default class ApiBro {

    constructor(location='') {
        this.location = location
    }

    fullPath(path='') {
        return `${this.location}${path}`
    }

    get(path='', data={}) {
        return service('get', this.fullPath(path), data)
    }

    post(path='', data={}) {
        return service('post', this.fullPath(path), data)
    }
}