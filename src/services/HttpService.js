import axios from 'axios'

export default class HttpService {
  constructor (serviceURL) {
    this.client = this._loadAxios(`https://reqres.in/api/${serviceURL}`)
  }

  _loadAxios (serviceURL) {
    return axios.create({
      baseURL: serviceURL,
    })
  }


  get (path, params = null) {
    return this.client.get(path, {
      params
    })
  }

  post (path, data) {
    return this.client.post(path, data)
  }

  put (path, data) {
    return this.client.put(path, data)
  }

  delete (path, params = null) {
    return this.client.delete(path, {
      params
    })
  }
}