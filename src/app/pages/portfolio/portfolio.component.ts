import { Component, OnInit } from '@angular/core'
import {
    PortfolioOverlayService,
    PortfolioProject,
} from '../../services/portfolio-overlay.service'

export { PortfolioProject }

declare const $: any

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css'],
    standalone: false,
})
export class PortfolioComponent implements OnInit {
    activeFilter = '*'
    filteredProjects: PortfolioProject[] = []
    projects: PortfolioProject[] = [
        {
            slug: 'alestilodemerex',
            title: 'Al Estilo de Merex',
            category: 'Web Design',
            filterClass: 'webdesign angular',
            previewImg: 'assets/img/alestilodemerex-preview.jpg',
            images: [
                'https://placehold.co/900x600/2a2a2a/c8a951?text=Al+Estilo+de+Merex',
            ],
            description:
                'Sitio creado para mostrar los trabajos de mi mujer. Angular 9 con Firebase Storage, Cloud Firestore y Cloud Functions para la gestion de contenido.',
            client: 'Merex',
            date: 'Junio, 2020',
            technologies: 'Angular 9 · Bootstrap 4 · Firebase',
            url: 'https://alestilodemerex.netlify.app/#/inicio',
        },
        {
            slug: 'merexpas',
            title: 'Merex PAS',
            category: 'Web Design',
            filterClass: 'webdesign angular',
            previewImg: 'assets/img/merexpas-preview.png',
            images: [
                'https://placehold.co/900x600/2a2a2a/c8a951?text=Merex+PAS',
            ],
            description:
                'Sitio web profesional para la Productora Asesora de Seguros de Maria Saucedo. Diseno responsivo optimizado para dispositivos moviles.',
            client: 'Maria Saucedo',
            date: 'Marzo, 2022',
            technologies: 'Angular 11 · Bootstrap 5 · SASS',
            url: 'https://merexpas.netlify.app/',
        },
    ]

    constructor(private overlayService: PortfolioOverlayService) {}

    ngOnInit(): void {
        this.overlayService.setProjects(this.projects)
        this.filteredProjects = this.projects
    }

    setFilter(filter: string): void {
        this.activeFilter = filter
        this.filteredProjects =
            filter === '*'
                ? this.projects
                : this.projects.filter((p) => p.filterClass.includes(filter))
    }

    openProject(project: PortfolioProject): void {
        this.overlayService.open(project)
    }
}
