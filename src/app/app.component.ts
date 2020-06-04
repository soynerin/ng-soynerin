import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  visitas: any;
  tazasDeCafe: any;
  proyectosTerminados: any;
  clientesFelices: any;


  constructor() {
    this.contadorVisitas();
    this.contadorTazasCafe();
    this.contadorProyectosTerminados();
    this.contadorClientesFelices();
  }

  contadorVisitas() {
    this.visitas = {
      countTo: 100,
      from: 0,
      duration: 5
    };
  }

  contadorTazasCafe() {
    const primerDiaTrabajo = moment('2015-01-09');
    const hoy = moment();
    const dias = hoy.diff(primerDiaTrabajo, 'days');

    this.tazasDeCafe = {
      countTo: dias,
      from: 0,
      duration: 10
    };
  }

  contadorProyectosTerminados() {
    this.proyectosTerminados = {
      countTo: 2,
      from: 0,
      duration: 5
    };
  }

  contadorClientesFelices() {
    this.clientesFelices = {
      countTo: 1,
      from: 0,
      duration: 5
    };
  }
}
