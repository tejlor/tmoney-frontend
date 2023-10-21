import {Type} from "class-transformer";
import {AbstractDto} from "./abstractDto";
import {Category} from "./category";

export class Account extends AbstractDto {
	code: string;
	name: string;
	active: boolean;
	includeInSummary: boolean;

	@Type(() => Category)
	balancingCategory: Category;

	color: string;
	lightColor: string;
	darkColor: string;
	orderNo: string;
	icon: string;
	logo: string;

	get colorCss() {
		return '#' + this.color;
	}

	get lightColorCss() {
		return '#' + this.lightColor;
	}

	get darkColorCss() {
		return '#' + this.darkColor;
	}
}