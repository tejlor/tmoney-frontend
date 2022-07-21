import {Injectable} from "@angular/core";
import {plainToClassFromExist, plainToInstance} from "class-transformer";
import {map, Observable} from "rxjs";
import {Entry} from "../model/entry";
import {TableData} from "../model/tableData";
import {TableParams} from "../model/tableParams";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class EntryHttpService extends HttpService {

  private readonly baseUrl = 'entries';

  getById(id: number): Observable<Entry> {
    return this.get(`${this.baseUrl}/${id}`)
      .pipe(map(result => this.deserialize(result)));
  }

  getTableByAccountCode(accountCode: string, tableParams: TableParams): Observable<TableData<Entry>> {
    return this.get(`${this.baseUrl}/table/${accountCode ?? ''}`, tableParams)
      .pipe(map(result => this.deserializeTableData(result)));
  }

  save(entry: Entry): Observable<Entry> {
    return this.post(`${this.baseUrl}`, entry)
      .pipe(map(result => this.deserialize(result)));
  }

  update(entry: Entry): Observable<Entry> {
    return this.put(`${this.baseUrl}/${entry.id}`, entry)
      .pipe(map(result => this.deserialize(result)));
  }

  saveOrUpdate(entry: Entry): Observable<Entry> {
    return entry.id ? this.update(entry) : this.save(entry);
  }

  updateBalances(): Observable<void> {
    return this.post(`${this.baseUrl}/updateBalances`);
  }

  private deserialize(entry: object): Entry {
    return plainToInstance(Entry, entry);
  }

  private deserializeTableData(entry: object): TableData<Entry> {
    return plainToClassFromExist(new TableData<Entry>(Entry), entry);
  }
}