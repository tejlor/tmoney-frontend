import {Type} from "class-transformer";
import {AbstractDto} from "./abstractDto";
import {Account} from "./account";
import {Category} from "./category";

export class Entry extends AbstractDto {

	@Type(() => Account)
	account: Account;
	date: string;
	@Type(() => Category)
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

	compareTo(other: Entry): number {
		if (!other) {
			return 1;
		}

		const dateCompare = this.date.localeCompare(other.date);
		if (dateCompare !== 0) {
			return dateCompare;
		}

		return this.id - other.id;
	}
}
