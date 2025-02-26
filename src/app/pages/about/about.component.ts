import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent implements OnInit {

  edad: number;
  visitas: any = {
    countTo: 1,
    from: 0,
    duration: 3
  };
  tazasDeCafe: any;
  proyectosTerminados: any;
  clientesFelices: any;

  constructor() {
    // this.contadorVisitas();
    this.contadorTazasCafe();
    this.contadorProyectosTerminados();
    this.contadorClientesFelices();
  }

  ngOnInit(): void {
    this.edad = moment().diff('1989-05-09', 'years');
  }

  // contadorVisitas() {

  //   countapi.get('soynerin.github.io', 'counter').then((result: any) => {

  //     this.visitas = {
  //       countTo: result.value,
  //       from: 0,
  //       duration: 3
  //     };
  //   });

  // }

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
