import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  add(image: File): Observable<void> {
    console.log('image: ', image);
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<void>('/api/upload', formData);
  }
}
