import {Injectable} from "@angular/core";

const TOKEN_KEY = 'jwt_token';

@Injectable({ providedIn: 'root' })
export class TokenService {

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  clear() {
    localStorage.removeItem(TOKEN_KEY);
  }
}