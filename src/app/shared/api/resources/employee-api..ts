import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { EmployeeDto } from "../dto/EmployeeDto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeApi {

  private readonly API = environment.endpoint_api + '/employee'

  constructor(
    private http: HttpClient
  ) {
  }

  fetchAll(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.API);
  }
}
