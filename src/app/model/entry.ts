import { Account } from "./account";

export class Entry {
	account: Account;
	date: Date;
	category: any;
	name: string;
	amount: number;
	description: string;
	balance: number;
	balanceOverall: number;
}
