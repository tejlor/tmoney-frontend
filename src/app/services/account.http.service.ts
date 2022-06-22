import {Injectable} from "@angular/core";
import {plainToInstance} from "class-transformer";
import {Observable, map} from "rxjs";
import {Account} from "../model/account";
import {AccountWithEntry} from "../model/accountWithLastEntry";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService extends HttpService {

  private readonly baseUrl = 'bank-accounts';

  getByCode(code: string): Observable<Account> {
    return this.get(`${this.baseUrl}/${code}`)
      .pipe(map(result => this.deserialize(result)));
  }

  getActive(): Observable<Account[]> {
    return this.get(`${this.baseUrl}`)
      .pipe(map(result => this.deserializeArray(result)));
  }

  getSummary(): Observable<AccountWithEntry[]> {
    return this.get(`${this.baseUrl}/summary`)
      .pipe(map(result => this.deserializeAccountWithEntries(result)));
  }

  private deserialize(account: object): Account {
    return plainToInstance(Account, account);
  }

  private deserializeArray(accounts: object[]): Account[] {
    return plainToInstance(Account, accounts);
  }

  private deserializeAccountWithEntries(accountWithEntries: object[]): AccountWithEntry[] {
    return plainToInstance(AccountWithEntry, accountWithEntries);
  }
}