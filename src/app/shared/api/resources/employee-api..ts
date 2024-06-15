import { Injectable } from '@angular/core';
import { environment as env } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EmployeeDto } from "../dto/EmployeeDto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeApi {
  private readonly headers = new HttpHeaders({'Content-Type': 'application/json'});
  private readonly basePath = env.endpoint_api + '/employees'

  constructor(private http: HttpClient) {
  }

  fetchAll(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.basePath);
  }

  save(employee: EmployeeDto): Observable<EmployeeDto> {
    return this.http.post<EmployeeDto>(this.basePath, employee, {
      headers: this.headers,
    });
  }
}
