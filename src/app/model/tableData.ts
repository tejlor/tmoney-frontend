import {Exclude, Type} from 'class-transformer';
import {TableInfo} from "./tableInfo";
import {TableParams} from "./tableParams";

export class TableData<T> {
  tableParams: TableParams;
  tableInfo: TableInfo;

  @Type(options => (options.newObject as TableData<T>).type)
  rows: T[];

  @Exclude()
  private type: Function;

  constructor(type: Function) {
    this.type = type;
  }
}