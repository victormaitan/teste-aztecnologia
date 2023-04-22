/* eslint-disable */
import HttpService from './HttpService.js';
export default class LoginService {
  constructor() {/* eslint-disable */
    this._httpService = new HttpService(`login`);
  }

  async FindAccreditedBySpecialityId(specialityId) {
    return await this._httpService.get('/telemedicine/accredited', { specialityId });
  }

  async SignIn(payload) {
    return await this._httpService.post('/', payload);
  }

  async CreateURLTelemedicineDuty(holderCpf, cpf) {
    return await this._httpService.post(`/telemedicine/request/duty?holderCpf=${holderCpf}&cpf=${cpf}`);
  }
}