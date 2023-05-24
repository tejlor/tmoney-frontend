import {Injectable} from "@angular/core";
import {plainToClassFromExist, plainToInstance} from "class-transformer";
import {map, Observable} from "rxjs";
import {TableData} from "../model/tableData";
import {TableParams} from "../model/tableParams";
import {TransferDefinition} from "../model/transferDefinition";
import {TransferRequest} from "../model/transferRequest";
import {HttpService} from "./http.service";

@Injectable({providedIn: 'root'})
export class TransferHttpService extends HttpService {

  private readonly baseUrl = 'transfers';
  

  getById(id: number): Observable<TransferDefinition> {
    return this.get(`${this.baseUrl}/definition/${id}`)
      .pipe(map(result => this.deserialize(result)));
  }

  getAll(): Observable<TransferDefinition[]> {
    return this.get(`${this.baseUrl}/definition`)
      .pipe(map(result => this.deserializeArray(result)));
  }

  getTable(tableParams: TableParams): Observable<TableData<TransferDefinition>> {
    return this.get(`${this.baseUrl}/definition/table`, tableParams)
      .pipe(map(result => this.deserializeTableData(result)));
  }

  save(definition: TransferDefinition): Observable<TransferDefinition> {
    return this.post(`${this.baseUrl}/definition`, definition)
      .pipe(map(result => this.deserialize(result)));
  }

  update(definition: TransferDefinition): Observable<TransferDefinition> {
    return this.put(`${this.baseUrl}/definition/${definition.id}`, definition)
      .pipe(map(result => this.deserialize(result)));
  }

  saveOrUpdate(definition: TransferDefinition): Observable<TransferDefinition> {
    return definition.id ? this.update(definition) : this.save(definition);
  }

  remove(id: number): Observable<void> {
    return this.delete(`${this.baseUrl}/definition/${id}`);
  }

  createTransfer(transfer: TransferRequest): Observable<void> {
    return this.post(`${this.baseUrl}`, transfer);
  }


  private deserialize(definition: object): TransferDefinition {
    return plainToInstance(TransferDefinition, definition);
  }

  private deserializeArray(definitions: object[]): TransferDefinition[] {
    return plainToInstance(TransferDefinition, definitions);
  }

  private deserializeTableData(table: object): TableData<TransferDefinition> {
    return plainToClassFromExist(new TableData<TransferDefinition>(TransferDefinition), table);
  }
}