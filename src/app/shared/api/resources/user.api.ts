import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment as env } from "../../../../environments/environment";
import { SignUpRequestDto, SignUpResponseDto, UserDto } from "../dto/sign-up.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserApi {
  private basePath = env.endpoint_api + '/users';

  constructor(private http: HttpClient) {
  }

  addUser(data: SignUpRequestDto): Observable<SignUpResponseDto> {
    return this.http.post<SignUpResponseDto>(this.basePath, {
      ...data
    });
  }

  getUserByEmail(email: string): Observable<UserDto[]> {
    let httpParams = new HttpParams();
    httpParams.set('email', email);
    return this.http.get<UserDto[]>(this.basePath + '?email=' + email);
  }

  getUserByEmail2(email: string): Observable<{ [key: string]: UserDto }> {
    let params = new HttpParams();
    params.set('email', email);
    return this.http.get<{ [key: string]: UserDto }>(this.basePath + '?email=' + email);
  }

  getAll() {
    this.http.get(this.basePath).subscribe(data => {
      console.log(data);
    })
  }

}
