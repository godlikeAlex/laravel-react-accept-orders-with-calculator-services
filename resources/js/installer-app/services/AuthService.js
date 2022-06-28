import api from "../http";

export default class AuthService {
  static async login(email, password) {
    return api.post('/login', {email, password});
  }

  static async refreshToken() {
    return api.post('/refresh');
  }

  static async logout() {
    return api.get('/logout');
  }
}