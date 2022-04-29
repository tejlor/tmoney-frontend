import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Account } from "../model/account";
import { AccountWithEntry } from "../model/accountWithLastEntry";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  constructor(private http: HttpService) {

  }

  getByCode(code: string): Observable<Account> {
    return this.http.get(`http://192.168.1.3:2711/bank-accounts/${code}`);
  }

  getSummary(): Observable<AccountWithEntry[]> {
    return this.http.get('http://192.168.1.3:2711/bank-accounts/summary');
  }


}