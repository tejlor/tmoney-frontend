import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {environment} from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient) {
  }

  protected get(url: string, params?: any): Observable<any> {
    const options = params ? {params} : undefined;
    return this.http.get(this.apiUrl + url, options);
  }

  protected getFile(url: string): Observable<Blob> {
    return this.http.get(this.apiUrl + url, {responseType: 'blob'});
  }

  protected post(url: string, body?: any, headers?: any): Observable<any> {
    const options = headers ? {headers} : undefined;
    return this.http.post(this.apiUrl + url, body, options);
  }

  protected put(url: string, body: any): Observable<any> {
    return this.http.put(this.apiUrl + url, body);
  }

  protected delete(url: string, params?: any): Observable<any> {
    const options = params ? {params} : undefined;
    return this.http.delete(this.apiUrl + url, options);
  }
}