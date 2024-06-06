import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private sharedData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  getSharedData(): Observable<boolean> {
    return this.sharedData.asObservable();
  }

  updateData(newData: boolean): void {
    this.sharedData.next(newData);
  }
}
