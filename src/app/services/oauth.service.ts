import {Injectable} from "@angular/core";
import {instanceToPlain, plainToInstance} from "class-transformer";
import {Observable, Subject} from "rxjs";
import {TokenInfo} from "../model/tokenInfo";
import {OAuthHttpService} from "./oauth.http.service";

@Injectable({
  providedIn: 'root'
})
export class OAuthService {

  private readonly TOKEN_KEY = 'token';

  private _token: TokenInfo;
  private get token(): TokenInfo {
    if (!this._token) {
      this._token = this.loadFromLocalStorage();
    }
    return this._token;
  }
  private set token(token: TokenInfo) {
    this._token = token;
    this.saveToLocalStorage(token);
  }

  constructor(
    private oauthHttpService: OAuthHttpService) {
  }

  getAccessToken(): string {
    return this.token?.accessToken;
  }

  generateAccessToken(login: string, password: string): Observable<boolean> {
    const result = new Subject<boolean>();
    this.oauthHttpService.getAccessToken(login, password).subscribe({
      next: token => {
        this.token = token;
        result.next(true);
      }, 
      error: () => result.next(false)
    });
    return result;
  }

  refreshToken() {
    this.oauthHttpService.refreshToken(this.token.refreshToken).subscribe(token => {
      this.token = token;
    });
  }

  logOut() {
    this.token = null;
  }

  isUserLoggedIn(): boolean {
    return !!this.token;
  }

  private loadFromLocalStorage(): TokenInfo {
    return plainToInstance(TokenInfo, JSON.parse(localStorage.getItem(this.TOKEN_KEY)));
  }

  private saveToLocalStorage(token: TokenInfo): void {
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, JSON.stringify(instanceToPlain(token)));
    }
    else {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

}