import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {OAuthService} from 'src/app/services/oauth.service';
import {BaseFormComponent} from '../../common/base-form.component';

@Component({
  selector: 'tm-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends BaseFormComponent implements OnInit {

  readonly LOGIN = 'login';
  readonly PASSWORD = 'password';

  errorMessage: string;

  constructor(el: ElementRef,
              fb: FormBuilder,
              private router: Router,
              private ouathService: OAuthService) {

    super(el, fb);
    this.buildForm([
      [this.LOGIN, true],
      [this.PASSWORD, true]
    ]);
  }

  ngOnInit(): void {
    this.ouathService.logout();
  }

  onLoginClick(): void {
    if (!this.isValid()) {
      return;
    }

    const login = this.controlValue(this.LOGIN);
    const password = this.controlValue(this.PASSWORD);
    this.ouathService.generateAccessToken(login, password).subscribe((result: boolean) => {
      if (result) {
        this.router.navigateByUrl(Path.dashboard);
      }
      else {
        this.errorMessage = 'Login i/lub hasło jest nieprawidłowe';
      }
    });
  }

}
