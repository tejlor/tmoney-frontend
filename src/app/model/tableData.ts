import { TableInfo } from "./tableInfo";
import { TableParams } from "./tableParams";

export class TableData<T> {
  tableParams: TableParams;
  tableInfo: TableInfo;
  rows: T[];
}