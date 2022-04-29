import { AbstractDto } from "./abstractDto";

export class Category extends AbstractDto {
	name: string;
	account: number;
	report: boolean;
	defaultName: number;
	defaultAmount: number;
	defaultDescription: string;
}
