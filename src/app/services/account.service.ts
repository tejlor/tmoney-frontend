import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Account} from "../model/account";
import {AccountHttpService} from "./account.http.service";

@Injectable({providedIn: 'root'})
export class AccountService {

  accounts$ = new BehaviorSubject<Account[]>([]);


  constructor(private accountHttpSevice: AccountHttpService) {
    this.accountHttpSevice.getAll(false).subscribe(accounts => {
      this.accounts$.next(accounts);
    });
  }

}
