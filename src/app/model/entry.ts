import { AbstractDto } from "./abstractDto";
import { Account } from "./account";

export class Entry extends AbstractDto {
	account: Account;
	date: Date;
	category: any;
	name: string;
	amount: number;
	description: string;
	balance: number;
	balanceOverall: number;
}
