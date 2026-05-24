import { Component, OnInit, OnDestroy } from '@angular/core'
import { ViewEncapsulation } from '@angular/core'
import { Subscription } from 'rxjs'
import {
    PortfolioOverlayService,
    PortfolioProject,
} from '../../services/portfolio-overlay.service'

@Component({
    selector: 'app-portfolio-overlay',
    templateUrl: './portfolio-overlay.component.html',
    styleUrls: ['./portfolio-overlay.component.css'],
    standalone: false,
    encapsulation: ViewEncapsulation.None,
})
export class PortfolioOverlayComponent implements OnInit, OnDestroy {
    project: PortfolioProject | null = null
    private sub!: Subscription

    constructor(private overlayService: PortfolioOverlayService) {}

    ngOnInit(): void {
        this.sub = this.overlayService.project$.subscribe((p) => {
            this.project = p
            if (p) {
                document.body.style.overflow = 'auto'
            } else {
                document.body.style.overflow = ''
            }
        })
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
    }

    close(): void {
        this.overlayService.close()
    }

    prev(): void {
        if (!this.project) return
        const projects = this.overlayService.getProjects()
        const idx = projects.findIndex((p) => p.slug === this.project!.slug)
        this.overlayService.open(
            projects[(idx - 1 + projects.length) % projects.length]
        )
    }

    next(): void {
        if (!this.project) return
        const projects = this.overlayService.getProjects()
        const idx = projects.findIndex((p) => p.slug === this.project!.slug)
        this.overlayService.open(projects[(idx + 1) % projects.length])
    }
}
