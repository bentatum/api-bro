
import { forOwn } from 'lodash.forown'
import { default as superagent } from 'superagent'

export default class ApiBro {
  constructor ({ pathPrefix }) {
    ['get', 'post', 'put', 'patch', 'del'].forEach((method) => {
      this[method] = (path, { params, data, headers } = {}) => new Promise((resolve, reject) => {
        const url = `${pathPrefix}${path}`
        const request = superagent[method](url)
        request.set('Accept', 'application/json')
        if (method === 'post') {
          request.set('Content-Type', 'application/json')
        }
        if (params) {
          request.query(params)
        }
        if (data) {
          request.send(data)
        }
        if (headers) {
          forOwn(headers, (val, key) => request.set(key, val))
        }
        request.end((err, { body } = {}) => {
          if (err) {
            return reject(body || err)
          }
          return resolve(body)
        })
      })
    })
  }
}
