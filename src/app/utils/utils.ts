import {DEC_FORMAT} from "./constants";
import {formatNumber} from '@angular/common';


export function firstUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function parseAmount(str: any): number {
  if (!str) {
    return 0;
  }
  const validStr = (str as string).replace(',', '.').replace(/[^0-9.\-]/g, '');
  return Number(validStr);
}

export function formatAmount(value: number): string {
  return formatNumber(value, 'pl-PL', DEC_FORMAT);
}
