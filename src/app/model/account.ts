import { AbstractDto } from "./abstractDto";
import {Category} from "./category";

export class Account extends AbstractDto {
	code: string;
	name: string;
	active: boolean;
	includeInSummary: boolean;
	balancingCategory: Category;
	color: string;
	lightColor: string;
	darkColor: string;
	orderNo: string;
	icon: string;
	logo: string;

	static summary() {
		const account = new Account();
		account.code = null;
		account.name = 'Podsumowanie';
		account.color = '0d76cd';
		account.icon = 'fa-wallet';
		return account;
	}
}