import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import moment from 'moment';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    standalone: false
})
export class ContactComponent implements OnInit {

  isLoading = true;
  currentYear: number;
  to = "neri.agustin.es@outlook.com";
  subject: string;
  text: string;
  message: string;
  from: string;
  name: string;

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.currentYear = moment().year();
  }

  sendEmail() {
    const htmlContent = `
      <h3>Nuevo mensaje de soyNerin.dev</h3>
      <p><strong>Nombre:</strong> ${this.name}</p>
      <p><strong>Email:</strong> ${this.from}</p>
      <p><strong>Asunto:</strong> ${this.subject}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${this.text}</p>
    `;

    this.emailService.sendEmail(this.to, this.subject, htmlContent).subscribe(
      response => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'El correo fue enviado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al enviar el correo.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    );
  }
}
