import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private budgetResponse: any[] = [];

  constructor(private http: HttpClient) {}

  fetchBudgetData(): Observable<any> {
    return this.http.get('http://localhost:3000/budget');
  }

  setBudgetData(data: any[]): void {
    this.budgetResponse = data;
  }

  getBudgetData(): any[] {
    return this.budgetResponse;
  }
}
