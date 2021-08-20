import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PdfForm } from '../interfaces/pdf-form';

import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) {}
  exportForm(pdfTemplateUrl: string, form: PdfForm, filename: string) {
    // get the pdf content in a array buffer
    this.getPdfContent(pdfTemplateUrl).subscribe((blob) => {
      console.log('blob: ', blob);
      blob.arrayBuffer().then((ab) => {
        console.log('ab: ', ab);
        // const filledBuf = pdfform().transform(pdf_buf, form);
        const filledBuf = ab;
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
