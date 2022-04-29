import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Entry } from "../model/entry";
import { TableData } from "../model/tableData";
import { TableParams } from "../model/tableParams";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class EntryHttpService {

  constructor(private http: HttpService) {

  }

  getByCode(code: string, tableParams: TableParams): Observable<TableData<Entry>> {
    return this.http.get(`http://192.168.1.3:2711/entries/table/${code}`, { params: tableParams });
  }

}