import {Type} from "class-transformer";
import {AbstractDto} from "./abstractDto";
import {Account} from "./account";
import {Category} from "./category";

export class TransferDefinition extends AbstractDto {

	@Type(() => Account)
	sourceAccount: Account;

	@Type(() => Account)
	destinationAccount: Account;

	@Type(() => Category)
	category: Category;

	name: string;
	description: string;
}
