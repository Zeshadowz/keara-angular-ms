import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LockScreenComponent } from "./lock-screen/lock-screen.component";

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  }, {
    path: 'register',
    component: RegisterComponent,
    data: {title: 'Register'}
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {title: 'Reset Password'}
  }, {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {title: 'Forgot Password'}
  }, {
    path: 'lock-screen',
    component: LockScreenComponent,
    data: {title: 'Lock Screen'}
  }
]
