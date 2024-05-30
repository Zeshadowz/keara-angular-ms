import { Routes } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LockScreenComponent } from "./lock-screen/lock-screen.component";

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: SignInComponent,
    data: {title: 'Login'}
  }, {
    path: 'register',
    component: SignUpComponent,
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
