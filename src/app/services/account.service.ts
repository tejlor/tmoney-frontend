import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Account} from "../model/account";
import {AccountHttpService} from "./account.http.service";

@Injectable({providedIn: 'root'})
export class AccountService {

  allAccounts$ = new BehaviorSubject<Account[]>([]);


  constructor(private accountHttpSevice: AccountHttpService) {
    this.loadAllAccounts();
  }

  clearCache(): void {
    this.loadAllAccounts();
  }

  private loadAllAccounts() {
    this.accountHttpSevice.getAll(false).subscribe(accounts => {
      this.allAccounts$.next(accounts);
    });
  }

}
