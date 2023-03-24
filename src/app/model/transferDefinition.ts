import {AbstractDto} from "./abstractDto";
import {Account} from "./account";
import {Category} from "./category";

export class TransferDefinition extends AbstractDto {
	sourceAccount: Account;
	destinationAccount: Account;
	category: Category;
	name: string;
	description: string;
}
