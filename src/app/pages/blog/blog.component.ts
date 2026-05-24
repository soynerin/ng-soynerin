import { Component, OnInit } from '@angular/core'
import { BlogOverlayService, BlogPost } from '../../services/blog-overlay.service'

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    standalone: false,
})
export class BlogComponent implements OnInit {
    posts: BlogPost[] = [
        {
            slug: 'angular-futuro-frontend',
            title: 'Angular y el futuro del desarrollo frontend moderno',
            category: 'Frontend',
            date: '12 enero 2025',
            previewImg: 'assets/img/undraw_blog.svg',
            body: 'Angular 17+ introduce señales (signals), control flow nativo (@if, @for) y standalone components como ciudadanos de primera clase. Estas mejoras reducen la verbosidad y mejoran el rendimiento al eliminar Zone.js de la ecuación. Las señales permiten una reactividad más granular y predecible, mientras que el nuevo control flow nativo reemplaza las directivas estructurales clásicas con una sintaxis más limpia y cercana al HTML estándar.',
            quote: 'El futuro de Angular no es solo más rápido, es conceptualmente más simple: menos magia, más claridad.',
            section: 'Señales y el nuevo modelo de reactividad',
            bullets: [
                'Signals reemplazan a RxJS para estado local del componente.',
                'El control flow (@if, @for, @switch) mejora la legibilidad del template.',
                'Standalone components eliminan la necesidad de NgModule.',
                'La hidratación diferida reduce el tiempo hasta el primer interactivo.',
            ],
            bodyExtra: 'Con estos cambios, Angular consolida su lugar como framework de elección para aplicaciones enterprise. La curva de aprendizaje se reduce y la experiencia del desarrollador mejora notablemente, especialmente en equipos que trabajan con TypeScript y patrones de arquitectura sólidos.',
        },
        {
            slug: 'ia-flujo-de-trabajo',
            title: 'Integrando agentes de IA en tu flujo de trabajo como dev',
            category: 'IA & Herramientas',
            date: '3 marzo 2025',
            previewImg: 'assets/img/undraw_blog.svg',
            body: 'GitHub Copilot, Claude, el protocolo MCP y agentes locales como Ollama están transformando la forma en que desarrollamos software. La clave no es dejar que la IA escriba todo el código, sino usarla como un multiplicador de productividad: para explorar APIs desconocidas, generar boilerplate, refactorizar y documentar.',
            quote: 'La IA no reemplaza al desarrollador, amplifica su capacidad de decisión y reduce el tiempo en tareas repetitivas.',
            section: 'Cómo integro IA en mi flujo diario',
            bullets: [
                'GitHub Copilot para completado de código y generación de tests.',
                'Claude con MCP para exploración de documentación y análisis de código.',
                'Agentes locales con Ollama para tareas offline y privacidad del código.',
                'VS Code + Copilot Chat para refactorizaciones guiadas por contexto.',
            ],
            bodyExtra: 'El resultado es un flujo donde dedico más tiempo a diseñar soluciones y menos a escribir código mecánico. La clave está en saber cuándo confiar en el agente y cuándo revisar su output, manteniendo siempre el criterio técnico del desarrollador.',
        },
        {
            slug: 'gitflow-equipos-pequenos',
            title: 'GitFlow en equipos pequeños: ventajas y cuándo usarlo',
            category: 'DevOps',
            date: '18 abril 2025',
            previewImg: 'assets/img/undraw_blog.svg',
            body: 'GitFlow es una estrategia de branching que define ramas específicas para features, releases y hotfixes. En equipos grandes es casi obligatorio, pero en equipos pequeños o proyectos personales puede parecer excesivo. En este post analizo cuándo vale la pena adoptarlo y cuándo simplificar con trunk-based development.',
            quote: 'Un historial de Git limpio es tan valioso como el código mismo: es la memoria del proyecto.',
            section: 'Cuándo usar GitFlow y cuándo no',
            bullets: [
                'GitFlow conviene en proyectos con ciclos de release bien definidos.',
                'Para proyectos personales o MVPs, trunk-based development es más ágil.',
                'Azure DevOps integra GitFlow con pipelines de CI/CD sin configuración extra.',
                'SourceTree facilita la visualización del árbol de ramas para equipos no-CLI.',
            ],
            bodyExtra: 'Basado en mi experiencia en OSPe, donde mantenemos múltiples versiones del portal en paralelo, GitFlow demostró ser la estrategia correcta. La clave fue documentar el flujo y capacitar al equipo, convirtiendo la gestión de ramas en un proceso predecible y sin fricciones.',
        },
        {
            slug: 'disenio-industrial-web',
            title: 'Cómo el diseño industrial mejora mi visión del desarrollo web',
            category: 'Diseño & UX',
            date: '7 mayo 2025',
            previewImg: 'assets/img/undraw_blog.svg',
            body: 'Mi formación como diseñador industrial me enseñó a pensar en función, ergonomía y usuario antes que en estética. Ese enfoque se traduce directamente al desarrollo web: cada componente tiene un propósito, cada flujo debe ser intuitivo y cada decisión visual debe justificarse con criterios de usabilidad.',
            quote: 'El buen diseño no se nota: el usuario simplemente logra su objetivo sin fricción ni confusión.',
            section: 'Principios del diseño industrial aplicados al frontend',
            bullets: [
                'Form follows function: la interfaz debe comunicar su propósito antes que impresionar.',
                'Ergonomía digital: ubicación predecible de controles y jerarquía visual clara.',
                'Prototipado rápido con Figma antes de escribir una línea de código.',
                'Feedback inmediato en cada interacción para reducir la incertidumbre del usuario.',
            ],
            bodyExtra: 'La interdisciplina entre ingeniería y diseño produce productos digitales más coherentes y duraderos. No se trata de saber dibujar, sino de habituarse a preguntarse "¿por qué este elemento está aquí y qué problema resuelve?" antes de implementarlo.',
        },
    ]

    constructor(private overlayService: BlogOverlayService) {}

    ngOnInit(): void {
        this.overlayService.setPosts(this.posts)
    }

    openPost(post: BlogPost): void {
        this.overlayService.open(post)
    }
}
