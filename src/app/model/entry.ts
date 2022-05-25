import {AbstractDto} from "./abstractDto";
import {Account} from "./account";
import {Category} from "./category";

export class Entry extends AbstractDto {
	account: Account;
	date: Date;
	category: Category;
	name: string;
	amount: number;
	description: string;
	balance: number;
	balanceOverall: number;

	constructor() {
		super();
		this.category = new Category();
	}
}
