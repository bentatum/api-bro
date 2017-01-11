
import { default as superagent } from 'superagent'

export default class ApiBro {
  constructor ({ withCredentials, pathPrefix, globalHeaders, globalParams, globalData } = {}) {
    ['get', 'post', 'put', 'patch', 'del'].forEach((method) => {
      this[method] = (path, { params, data, headers } = {}) => new Promise((resolve, reject) => {
        const url = `${pathPrefix}${path}`
        let request = superagent[method](url)

        if (withCredentials) {
          request = request.withCredentials()
        }

        request.set('Accept', 'application/json')

        if (method === 'post') {
          request.set('Content-Type', 'application/json')
        }

        if (params) {
          if (globalParams) {
            request.query({
              ...globalParams,
              ...params
            })
          } else {
            request.query(params)
          }
        }

        if (data) {
          if (globalData) {
            request.send({
              ...globalData,
              ...data
            })
          } else {
            request.send(data)
          }
        }

        if (globalHeaders) {
          this.setHeaders(globalHeaders, request)
        }

        if (headers) {
          this.setHeaders(headers, request)
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

  setHeaders (headers, request) {
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        request.set(key, headers[key])
      }
    }
  }
}
