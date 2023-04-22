/* eslint-disable */
import HttpService from './HttpService.js';
export default class LoginService {
  constructor() {/* eslint-disable */
    this._httpService = new HttpService(``);
  }

  async SignIn(payload) {
    return await this._httpService.post('/login', payload);
  }

  async SignUp(payload) {
    return await this._httpService.post('/register', payload);
  }
}