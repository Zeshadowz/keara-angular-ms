import { Injectable } from '@angular/core';
import { environment as env } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EmployeeDto } from "../dto/EmployeeDto";
import { lastValueFrom, Observable } from "rxjs";

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

  delete(employee: EmployeeDto) {
    const deletePath = this.basePath + '/' + employee.id;
    console.log('deleting employee', deletePath);
    return this.http.delete<EmployeeDto>(deletePath);
  }

  async remove(employee: EmployeeDto) {
    const deletePath = this.basePath + '/' + employee.id;
    console.log('Removing employee', deletePath);
    const $request = this.http.delete<EmployeeDto>(deletePath);
    return await lastValueFrom<EmployeeDto>($request)
  }
}
