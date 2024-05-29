import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../../../environments/environment";
import { SignUpRequestDto, SignUpResponseDto } from "../dto/sign-up.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserResourceService {
  private basePath = env.endpoint_api + '/users';

  constructor(private http: HttpClient) {
  }

  addUser(data: SignUpRequestDto): Observable<SignUpResponseDto> {
    return this.http.post<SignUpResponseDto>(this.basePath, {
      ...data
    });
  }

  getAll() {
    this.http.get(this.basePath).subscribe(data => {
      console.log(data);
    })
  }
}
