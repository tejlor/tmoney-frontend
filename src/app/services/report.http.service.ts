import {Injectable} from "@angular/core";
import {Observable, map} from "rxjs";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class ReportHttpService extends HttpService {

  private readonly baseUrl = 'reports';

  generateTable(accountCode?: string): Observable<Blob> {
    return this.getFile(`${this.baseUrl}/table/${accountCode ?? ''}`);
  }

}