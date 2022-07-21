import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {OAuthService} from 'src/app/services/oauth.service';

@Component({
  selector: 'tm-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  formGroup: FormGroup;
  errorMsg: string;

  constructor(fb: FormBuilder,
              private router: Router,
              private ouathService: OAuthService) {

    this.formGroup = fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ouathService.logOut();
  }

  onLogin(): void {
    if (!this.isValid()) {
      return;
    }

    const login = this.formGroup.controls['login'].value;
    const password = this.formGroup.controls['password'].value;
    this.ouathService.generateAccessToken(login, password).subscribe(result => {
      if (result) {
        this.router.navigateByUrl(Path.dashboard);
      }
      else {
        this.errorMsg = 'Login i/lub hasło jest nieprawidłowe';
      }
    });
  }

  private isValid(): boolean {
    this.formGroup.markAllAsTouched();
    return this.formGroup.valid;
  }
}
