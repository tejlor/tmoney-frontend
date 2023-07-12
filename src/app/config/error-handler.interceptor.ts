import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, Observable, of} from "rxjs";
import {Path} from "../app-routing.module";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

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
        if (error.error.error === 'invalid_grant') {
          this.router.navigateByUrl(Path.login());
          throw new Error('Refresh token jest nieprawidłowy');
        }
        else {
          msg = '400 - Przesłano błędne dane';
        }
        break;
      case 401:
        this.router.navigateByUrl(Path.login());
        throw new Error('Token jest nieprawidłowy');
      case 403:
        msg = '403 - Nie posiadasz uparwnień do wykonania tej akcji';
        break;
      case 404:
        msg = '404 - Nie odnaleziono danych';
        break;
      case 500:
        msg = '500 - Wystąpił nieoczekiwany błąd na serwerze';
        break;
      default:
        msg = `Wystąpił nieznany kod statusu odpowiedzi: ${error.status} - ${error.statusText}`;
    }

    if (msg) {
      this.handleError(msg);
    }

    return of(msg);
  }

  private handleError(msg: string) {
    console.error(msg);
    throw msg;
  }
}