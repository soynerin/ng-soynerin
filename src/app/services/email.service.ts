import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private functionUrl = `${environment.supabaseUrl}/functions/v1/send-contact-email`;

  constructor(private http: HttpClient) { }

  sendEmail(payload: ContactPayload): Observable<any> {
    return this.http.post<any>(this.functionUrl, payload);
  }
}
