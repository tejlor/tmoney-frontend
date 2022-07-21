import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {OAuthService} from "./services/oauth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private ouathService: OAuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.ouathService.isUserLoggedIn();
  }

}
