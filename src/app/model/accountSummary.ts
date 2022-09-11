import {Type} from "class-transformer";
import {Account} from "./account";
import {Entry} from "./entry";

export class AccountSummary {

  @Type(() => Account)
  account: Account;

  @Type(() => Entry)
  entry: Entry;

  constructor(account: Account, entry: Entry) {
    this.account = account;
    this.entry = entry;
  }
}