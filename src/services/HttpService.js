import axios from 'axios'

export default class HttpService {
  constructor (serviceURL) {
    this.ws = this._loadAxios(`https://reqres.in/api/${serviceURL}`)
  }

  _loadAxios (serviceURL) {
    return axios.create({
      baseURL: serviceURL,
    })
  }


  get (path, params = null) {
    return this.ws.get(path, {
      params
    })
  }

  post (path, data) {
    return this.ws.post(path, data)
  }

  put (path, data) {
    return this.ws.put(path, data)
  }

  delete (path, params = null) {
    return this.ws.delete(path, {
      params
    })
  }

  getBlob (path) {
    // this.ws = this._loadAxios(path, "blob" )
    return this.ws.get(path, { responseType: 'blob' })
  }

  all (path, params) {
    const requests = []
    params.forEach(param => {
      requests.push(this.get(path, {
        [param.label]: param.value
      }))
    })

    return axios.all(requests)
  }
}