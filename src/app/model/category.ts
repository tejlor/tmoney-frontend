import {AbstractDto} from "./abstractDto";

export class Category extends AbstractDto {
	name: string;
	accountIds: number[];
	report: boolean;
	defaultName: number;
	defaultAmount: number;
	defaultDescription: string;
}
