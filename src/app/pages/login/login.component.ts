import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({ username: ['', Validators.required] });
  }

  handleLoginButton(): void {
    if (this.loginForm.valid) {
      this.userService.setActualUser(this.loginForm.value.username);
      // TODO
      //this.router.navigate(['game']);
    }
  }
}
