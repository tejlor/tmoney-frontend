import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
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
    const options = params ? {params: params} : undefined;
    return this.http.get(this.apiUrl + url, options);
  }

  protected post(url: string, body: any): Observable<any> {
    return this.http.post(this.apiUrl + url, body);
  }

  protected put(url: string, body: any): Observable<any> {
    return this.http.put(this.apiUrl + url, body);
  }
}