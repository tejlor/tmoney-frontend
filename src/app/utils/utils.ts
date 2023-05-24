import {DEC_FORMAT} from "./constants";
import {formatNumber} from '@angular/common';


export function bit(position: number) {
  return 1 << position;
}

export function firstUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function parseAmount(str: any) {
  const validStr = (str as string).replace(',', '.').replace(/[^0-9.\-]/g, '');
  return Number(validStr);
}

export function formatAmount(value: number): string {
  return formatNumber(value, 'pl-PL', DEC_FORMAT);
}
