import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = environment.apiUrl + '/send-email'; // Asegúrate de que este puerto coincide con tu backend

  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, html: string): Observable<any> {
    const emailData = { to, subject, html };
    return this.http.post<any>(this.apiUrl, emailData);
  }
}
