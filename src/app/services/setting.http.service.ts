import {Injectable} from "@angular/core";
import {plainToInstance} from "class-transformer";
import {map, Observable} from "rxjs";
import {Setting} from "../model/setting";
import {HttpService} from "./http.service";

@Injectable({providedIn: 'root'})
export class SettingHttpService extends HttpService {

  private readonly baseUrl = 'settings';
  

  getAll(): Observable<Setting[]> {
    return this.get(`${this.baseUrl}`)
      .pipe(map(result => this.deserializeArray(result)));
  }

  private deserializeArray(settings: object[]): Setting[] {
    return plainToInstance(Setting, settings);
  }
}