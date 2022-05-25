import {Injectable} from "@angular/core";
import {plainToInstance} from "class-transformer";
import {map, Observable} from "rxjs";
import {Category} from "../model/category";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService extends HttpService {

  private readonly baseUrl = 'categories';

  getAll(): Observable<Category[]> {
    return this.get(`${this.baseUrl}`)
      .pipe(map(result => this.deserializeArray(result)));
  }

  getByAccountCode(accountCode: string): Observable<Category[]> {
    return this.get(`${this.baseUrl}/${accountCode}`)
      .pipe(map(result => this.deserializeArray(result)));
  }

  private deserializeArray(categories: object[]): Category[] {
    return plainToInstance(Category, categories);
  }
}