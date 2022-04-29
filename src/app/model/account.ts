import { AbstractDto } from "./abstractDto";

export class Account extends AbstractDto {
	code: string;
	name: string;
	active: boolean;
	color: string;
	orderNo: string;
	icon: string;
}