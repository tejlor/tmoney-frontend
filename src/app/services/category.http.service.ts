import {Injectable} from "@angular/core";
import {plainToClassFromExist, plainToInstance} from "class-transformer";
import {map, Observable} from "rxjs";
import {Category} from "../model/category";
import {TableData} from "../model/tableData";
import {TableParams} from "../model/tableParams";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService extends HttpService {

  private readonly baseUrl = 'categories';
  

  getById(id: number): Observable<Category> {
    return this.get(`${this.baseUrl}/${id}`)
      .pipe(map(result => this.deserialize(result)));
  }

  getByAccountCode(accountCode: string): Observable<Category[]> {
    return this.get(`${this.baseUrl}/account/${accountCode}`)
      .pipe(map(result => this.deserializeArray(result)));
  }

  getAll(): Observable<Category[]> {
    return this.get(`${this.baseUrl}`)
      .pipe(map(result => this.deserializeArray(result)));
  }

  getTable(tableParams: TableParams): Observable<TableData<Category>> {
    return this.get(`${this.baseUrl}/table`, tableParams)
      .pipe(map(result => this.deserializeTableData(result)));
  }

  save(category: Category): Observable<Category> {
    return this.post(`${this.baseUrl}`, category)
      .pipe(map(result => this.deserialize(result)));
  }

  update(category: Category): Observable<Category> {
    return this.put(`${this.baseUrl}/${category.id}`, category)
      .pipe(map(result => this.deserialize(result)));
  }

  remove(id: number, newCategoryId?: number): Observable<Category> {
    return this.delete(`${this.baseUrl}/${id}`, {newCategoryId})
      .pipe(map(result => this.deserialize(result)));
  }

  saveOrUpdate(category: Category): Observable<Category> {
    return category.id ? this.update(category) : this.save(category);
  }

  private deserialize(category: object): Category {
    return plainToInstance(Category, category);
  }

  private deserializeArray(categories: object[]): Category[] {
    return plainToInstance(Category, categories);
  }

  private deserializeTableData(category: object): TableData<Category> {
    return plainToClassFromExist(new TableData<Category>(Category), category);
  }
}