import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PdfForm } from '../interfaces/pdf-form';

import { saveAs } from 'file-saver';

const pdfform = (window as any).pdfform;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) {}
  exportForm(pdfTemplateUrl: string, form: PdfForm, filename: string) {
    const fields = Object.keys(form).reduce((acc, key) => {
      acc[key] = [form[key]];
      return acc;
    }, {} as { [key: string]: string[] });

    // get the pdf content in a array buffer
    this.getPdfContent(pdfTemplateUrl).subscribe((blob) => {
      console.log('blob: ', blob);
      blob.arrayBuffer().then((ab) => {
        console.log('ab: ', ab);
        console.log('pdfform: ', pdfform);
        const field_specs = pdfform().list_fields(ab);
        console.log('field_specs: ', field_specs);

        const filledBuf = pdfform().transform(ab, fields);
        // const filledBuf = ab;
        const filledBlob = new Blob([filledBuf], { type: 'application/pdf' });
        saveAs(filledBlob, filename);
      });
    });
    // save the pdf
  }

  getPdfContent(pdfTemplateUrl: string): Observable<Blob> {
    return this.http
      .get(pdfTemplateUrl, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(map((response) => response.body as Blob));
  }
}
