import {HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {plainToInstance} from "class-transformer";
import {Observable, map} from "rxjs";
import {HttpService} from "./http.service";
import {environment} from "src/environments/environment";
import {TokenInfo} from "../model/tokenInfo";

@Injectable({
  providedIn: 'root'
})
export class OAuthHttpService extends HttpService {

  private readonly baseUrl = 'oauth';

  getAccessToken(login: string, password: string): Observable<TokenInfo> {
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        username: login,
        password: password
      }
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(environment.clientName + ":" + environment.clientPass)
    };
    return this.post(`${this.baseUrl}/token`, params, headers)
      .pipe(map(result => this.deserialize(result)));
  }

  refreshToken(refreshToken: string): Observable<TokenInfo> {
    const params = new HttpParams({
      fromObject: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(environment.clientName + ":" + environment.clientPass)
    };
    return this.post(`${this.baseUrl}/token`, params, headers)
      .pipe(map(result => this.deserialize(result)));
  }

  private deserialize(tokenInfo: object): TokenInfo {
    return plainToInstance(TokenInfo, tokenInfo);
  }

}