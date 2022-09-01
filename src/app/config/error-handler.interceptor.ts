import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, of} from "rxjs";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => this.catch(error))
      );
  }

  private catch(error: HttpErrorResponse): Observable<any> {
    let msg = '';
      
    switch(error.status) {
      case 400:
        msg = 'Przesłano błędne dane';
        break;
      case 401: 
      case 403:
        msg = 'Nie posiadasz uparwnień do wykonania tej akcji'; 
        break;
      case 404: 
        msg = 'Nie odnaleziono danych';
        break;
      case 500:
        msg = 'Wystąpił nieoczekiwany bład na serwerze';
        break;
      default:
        msg = `Wystapił nieznany kod statusu odpowiedzi: ${error.status} - ${error.statusText}`;
    }

    if (msg) {
      this.handleError(msg);
    }

    return of(msg);
  }

  private handleError(msg: string) {
    console.log(msg);
  }
}