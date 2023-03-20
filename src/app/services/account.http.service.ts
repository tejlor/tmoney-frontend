import {Injectable} from "@angular/core";
import {plainToClassFromExist, plainToInstance} from "class-transformer";
import {Observable, map} from "rxjs";
import {Account} from "../model/account";
import {AccountSummary} from "../model/accountSummary";
import {BalanceRequest} from "../model/balanceRequest";
import {TableData} from "../model/tableData";
import {TableParams} from "../model/tableParams";
import {HttpService} from "./http.service";

@Injectable({providedIn: 'root'})
export class AccountHttpService extends HttpService {

  private readonly baseUrl = 'bank-accounts';

  getById(id: number): Observable<Account> {
    return this.get(`${this.baseUrl}/${id}`)
      .pipe(map(result => this.deserialize(result)));
  }

  getByCode(code: string): Observable<Account> {
    return this.get(`${this.baseUrl}/${code}`)
      .pipe(map(result => this.deserialize(result)));
  }

  getAll(active: boolean): Observable<Account[]> {
    return this.get(`${this.baseUrl}`, {active})
      .pipe(map(result => this.deserializeArray(result)));
  }

  getTable(tableParams: TableParams): Observable<TableData<Account>> {
    return this.get(`${this.baseUrl}/table`, tableParams)
      .pipe(map(result => this.deserializeTableData(result)));
  }

  getSummary(code?: string): Observable<AccountSummary[]> {
    return this.get(`${this.baseUrl}/summary/${code ?? ''}`)
      .pipe(map(result => this.deserializeAccountSummaryArray(result)));
  }

  save(account: Account): Observable<Account> {
    return this.post(`${this.baseUrl}`, account)
      .pipe(map(result => this.deserialize(result)));
  }

  update(account: Account): Observable<Account> {
    return this.put(`${this.baseUrl}/${account.id}`, account)
      .pipe(map(result => this.deserialize(result)));
  }

  saveOrUpdate(account: Account): Observable<Account> {
    return account.id ? this.update(account) : this.save(account);
  }

  balance(request: BalanceRequest): Observable<any> {
    return this.post(`${this.baseUrl}/${request.accountId}/balance`, request);
  }

  private deserialize(account: object): Account {
    return plainToInstance(Account, account);
  }

  private deserializeArray(accounts: object[]): Account[] {
    return plainToInstance(Account, accounts);
  }

  private deserializeAccountSummaryArray(accountSummaries: object[]): AccountSummary[] {
    return plainToInstance(AccountSummary, accountSummaries);
  }

  private deserializeTableData(account: object): TableData<Account> {
    return plainToClassFromExist(new TableData<Account>(Account), account);
  }
}