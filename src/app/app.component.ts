import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import countapi from 'countapi-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  visitas: any = {
    countTo: 0,
    from: 0,
    duration: 3
  };
  tazasDeCafe: any;
  proyectosTerminados: any;
  clientesFelices: any;

  constructor() {
    this.contadorVisitas();
    this.contadorTazasCafe();
    this.contadorProyectosTerminados();
    this.contadorClientesFelices();
  }

  ngOnInit(): void {

    if (environment.production) {
      countapi.update('soynerin.github.io/', 'counter', 1).then((result: any) => { });
    }
  }

  contadorVisitas() {

    countapi.get('soynerin.github.io', 'counter').then((result: any) => {

      this.visitas = {
        countTo: result.value,
        from: 0,
        duration: 3
      };
    });

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

  // getGreetingTime(m) {
  //   let g = null;

  //   if(!m || !m.isValid()) { return; }

  //   const split_afternoon = 12;
  //   const split_evening = 17;
  //   const currentHour = parseFloat(m.format('HH'));

  //   if(currentHour >= split_afternoon && currentHour <= split_evening) {
  //     g = 'afternoon';
  //   } else if(currentHour >= split_evening) {
  //     g = 'evening';
  //   } else {
  //     g = 'morning';
  //   }

  //   return g;
  // }
}
