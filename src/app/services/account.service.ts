import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Account} from "../model/account";
import {AccountHttpService} from "./account.http.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  activeAccounts$: Observable<Account[]>;

  private _activeAccounts: Account[];
  get activeAccounts() {
    return this._activeAccounts;
  }
  set activeAccounts(value: Account[]) {
    this._activeAccounts = value;
    this._activeAccounts$.next(value);
  }
  private _activeAccounts$ = new BehaviorSubject<Account[]>([]);


  constructor(
    private accountHttpSevice: AccountHttpService) {

    this.activeAccounts$ = this._activeAccounts$.asObservable();

    this.accountHttpSevice.getActive().subscribe(accounts =>
      this.activeAccounts = accounts
    );
  }

}
