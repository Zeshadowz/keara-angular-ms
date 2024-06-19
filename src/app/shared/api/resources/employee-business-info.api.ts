import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment as env } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { EmployeeBusinessInfoDto } from "../dto/employee-business-info.dto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeBusinessInfoApi {
  private readonly headers = new HttpHeaders({'Content-Type': 'application/json'});
  private readonly basePath = env.endpoint_api + '/employee_business_info'

  constructor(private http: HttpClient) {
  }

  fetchById(id: string): Observable<EmployeeBusinessInfoDto> {
    return this.http.get<EmployeeBusinessInfoDto>(`${this.basePath}/${id}`);
  }
}
