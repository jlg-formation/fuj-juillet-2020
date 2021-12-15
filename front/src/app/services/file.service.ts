import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  add(image: any): Observable<void> {
    const formData = new FormData();
    formData.append('file', image.value);
    return this.http.post<void>('/api/upload', formData);
  }
}
