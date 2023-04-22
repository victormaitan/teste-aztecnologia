/* eslint-disable */
import HttpService from './HttpService.js';
export default class CandidatesService {
  constructor() {/* eslint-disable */
    this._httpService = new HttpService(``);
  }

  async FetchCandidates(payload) {
    return await this._httpService.get(`/users?delay=3&page=${payload.page}`);
  }

  async RegisterCandidate(payload) {
    return await this._httpService.post('/users', payload);
  }

  async UpdateCandidate(payload) {
    return await this._httpService.put(`/users/${payload.id}`, payload);
  }

  async DeleteCandidate(id) {
    return await this._httpService.delete(`/users/${id}`);
  }
}