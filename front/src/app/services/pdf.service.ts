import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) {}
  exportForm(pdfTemplateFilename: string, form: { [key: string]: string }) {
    // get the pdf content in a array buffer
    const pdf = this.getPdfContent(pdfTemplateFilename);
    // save the pdf
  }

  getPdfContent(pdfTemplateFilename: string): ArrayBuffer {
    return new ArrayBuffer(0);
  }
}
