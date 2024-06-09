import { inject, Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Token } from "../../../core/auth/model/token.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  protected readonly LOGIN_URL: string = environment.endpoint_api + '/auth'

  protected readonly http = inject(HttpClient);

  constructor() {
  }

  login(username: string, password: string) {
    this.http.post<Token>(this.LOGIN_URL + "/" + username, {})
  }
}
