import {Injectable} from "@angular/core";
import {instanceToPlain, plainToInstance} from "class-transformer";
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

  refreshToken() {
    this.oauthHttpService.refreshToken(this.token.refreshToken).subscribe(token => {
      this.token = token;
    });
  }
  
  private loadFromLocalStorage(): TokenInfo {
    return plainToInstance(TokenInfo, JSON.parse(localStorage.getItem(this.TOKEN_KEY)));
  }

  private saveToLocalStorage(token: TokenInfo): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(instanceToPlain(token)));
  }
  
}