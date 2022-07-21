import {Type} from "class-transformer";
import {Account} from "./account";
import {Entry} from "./entry";

export class AccountWithEntry {

  @Type(() => Account)
  account: Account;

  @Type(() => Entry)
  entry: Entry;
}