import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Path} from "../app-routing.module";
import {OAuthService} from "../services/oauth.service";

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {

  private anonymousUrls = ['oauth/token'];
  private regexp = new RegExp('^https?:\/\/.+?\/api\/(.+)$');

  constructor(
    private router: Router,
    private oauthService: OAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isUrlAnonymous(request.url.toLowerCase())) {
      return next.handle(request);
    }

    const token = this.oauthService.getAccessToken();
    if (!token) {
      this.router.navigateByUrl(Path.login);
      throw new Error('Token is missing');
    }

    const header = `Bearer ${token}`;
    request = request.clone({
      setHeaders: {
        Authorization: header
      }
    });
    return next.handle(request);
  }

  private isUrlAnonymous(url: string): boolean {
     console.log(url);
     const relativeUrl = this.regexp.exec(url)[1];
     return this.anonymousUrls.find(u => u.startsWith(relativeUrl)) !== undefined;
  }
}