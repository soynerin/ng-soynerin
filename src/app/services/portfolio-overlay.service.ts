import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface PortfolioProject {
    slug: string
    title: string
    category: string
    filterClass: string
    previewImg: string
    images: string[]
    description: string
    client: string
    date: string
    technologies: string
    url: string
}

@Injectable({ providedIn: 'root' })
export class PortfolioOverlayService {
    private projectSubject = new BehaviorSubject<PortfolioProject | null>(null)
    project$ = this.projectSubject.asObservable()
    private projects: PortfolioProject[] = []

    setProjects(projects: PortfolioProject[]): void {
        this.projects = projects
    }

    getProjects(): PortfolioProject[] {
        return this.projects
    }

    open(project: PortfolioProject): void {
        this.projectSubject.next(project)
    }

    close(): void {
        this.projectSubject.next(null)
    }

    current(): PortfolioProject | null {
        return this.projectSubject.getValue()
    }
}
