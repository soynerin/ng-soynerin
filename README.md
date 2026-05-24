# soynerin — Portfolio Personal

Sitio web de portfolio personal de **Neri Espinola**, desarrollado con Angular 19. Basado en el template HTML Arshia, adaptado completamente a la arquitectura de Angular con componentes, servicios reactivos y navegación SPA.

## Stack

- **Angular 19** — NgModule, RouterModule con `useHash: true`, animaciones de ruta
- **Bootstrap 5** + **Bootstrap Icons**
- **jQuery** + arshia.js — control del sidebar y animaciones del template
- **RxJS** — servicios con `BehaviorSubject` para los overlays de portfolio y blog
- **ngx-countup** — animación de contadores numéricos
- **SweetAlert2** — notificaciones en el formulario de contacto
- **Moment.js** — manejo de fechas

## Secciones

| Ruta | Sección |
|---|---|
| `#/hero` | Presentación y accesos rápidos |
| `#/about` | Sobre mí — habilidades y estadísticas |
| `#/resume` | Experiencia y formación académica |
| `#/works` | Portfolio con overlay de detalle |
| `#/blog` | Artículos con overlay de lectura completa |
| `#/contact` | Formulario de contacto y datos de ubicación |

## Requisitos previos

- [Node.js](https://nodejs.org/) LTS
- Angular CLI: `npm install -g @angular/cli`

## Instalación

```sh
npm install
```

## Desarrollo

```sh
npm start
# o
ng serve
```

Abre `http://localhost:4200/` en el navegador.

## Build de producción

```sh
npm run build
# salida en dist/ng-soynerin/browser/
```

## Tests

```sh
ng test   # unit tests con Karma
ng e2e    # end-to-end con Protractor
```

## Linting

```sh
ng lint
```

## Deploy

El proyecto está configurado para dos plataformas:

- **Netlify** — `netlify.toml` define el comando de build y redirect SPA
- **Firebase Hosting** — `firebase.json` apunta a `dist/ng-soynerin`

