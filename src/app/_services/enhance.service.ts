import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnhanceService {
  constructor(private http: HttpClient) {}

  getEnhancedPerson(person: Object): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/enhance`, person);
  }

  getEnhancedPeople(people: Array<Object>): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.post<any>(`http://localhost:8080/batchEnhance`, people, options);
  }
}
