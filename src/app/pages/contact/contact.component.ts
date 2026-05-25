import { Component } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import { isValidEmail } from 'src/app/utils/validators';
import Swal from 'sweetalert2';

const SWAL_THEME = {
  background: '#2c2d30',
  color: '#e1e1e1',
  confirmButtonColor: '#dba423',
};

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    standalone: false
})

export class ContactComponent {

  isLoading = true;
  sending = false;
  submitted = false;
  currentYear = new Date().getFullYear();
  subject = '';
  text = '';
  from = '';
  name = '';

  constructor(private emailService: EmailService) {}

  isValidEmail = isValidEmail;

  sendEmail() {
    this.submitted = true;

    const firstEmpty = [
      { value: this.name, id: 'name' },
      { value: this.from, id: 'email' },
      { value: this.subject, id: 'subject' },
      { value: this.text, id: 'comments' },
    ].find(f => !f.value.trim());

    if (firstEmpty) {
      const el = document.getElementById(firstEmpty.id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus();
      return;
    }

    if (!this.isValidEmail(this.from)) {
      const el = document.getElementById('email');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus();
      return;
    }

    this.sending = true;

    this.emailService.sendEmail({
      name: this.name.trim(),
      email: this.from.trim(),
      subject: this.subject.trim(),
      message: this.text.trim(),
    }).subscribe(
      response => {
        this.sending = false;
        this.submitted = false;
        Swal.fire({
          ...SWAL_THEME,
          title: '¡Mensaje enviado!',
          text: 'Gracias por escribirme, te responderé a la brevedad.',
          icon: 'success',
          confirmButtonText: 'Cerrar',
          iconColor: '#dba423',
        });
        this.name = '';
        this.from = '';
        this.subject = '';
        this.text = '';
      },
      error => {
        this.sending = false;
        Swal.fire({
          ...SWAL_THEME,
          title: 'Error al enviar',
          text: 'Hubo un problema al enviar el mensaje. Intentá de nuevo.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
        });
      }
    );
  }
}
