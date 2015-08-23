import 'whatwg-fetch'
import queryString from 'query-string'
import keys from 'lodash/object/keys'
import sortBy from 'lodash/collection/sortBy'
import forIn from 'lodash/object/forIn'
import isEqual from 'lodash/lang/isEqual'

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
                .then(res => res.status == 200 ? res.json() : null)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

    multiRequestService(type, req) {
        let reqKeys = []
        let resKeys = []
        let multiReqRes = {}
        return new Promise((resolve, reject) => {
            forIn(req, (value, key) => {
                fetch(this.fullPath(value))
                    .then(res => res.status == 200 ? res.json() : null)
                    .then(res => {
                        multiReqRes[key] = res
                        reqKeys = sortBy(keys(req))
                        resKeys = sortBy(keys(multiReqRes))
                        if (!resKeys.length) 
                            return
                        if (isEqual(reqKeys,resKeys))
                            resolve(multiReqRes)
                    })
                    .catch(err => reject(err))
            })
        })
    }

    get(path='', data={}) {
        if (typeof path === 'string')
            return this.service('get', this.fullPath(path), data)
        return this.multiRequestService('get', path) 
    }

    post(path='', data={}) {
        return this.service('post', this.fullPath(path), data)
    }
}