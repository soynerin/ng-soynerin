import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { forkJoin } from 'rxjs'
import moment from 'moment'

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false,
})
export class AboutComponent implements OnInit, AfterViewInit {
    edad: number = 0
    proyectosTerminados = 0
    tazasDeCafe = 0
    clientesFelices = 0
    aniosExperiencia = 0
    countUpOptions = { enableScrollSpy: false, duration: 2 }
    private animated = false
    githubLanguages: { name: string; percent: number }[] = []
    githubLoading = true

    constructor(private http: HttpClient, private zone: NgZone) {}

    ngOnInit(): void {
        this.edad = moment().diff('1989-05-09', 'years')
        this.fetchGitHubLanguages()
    }

    ngAfterViewInit(): void {
        const section = document.getElementById('about')
        if (!section) return

        const trigger = () => {
            this.zone.run(() => {
                this.animated = true
                this.proyectosTerminados = 2
                this.tazasDeCafe = this.calcDiasHabiles()
                this.clientesFelices = 1
                this.aniosExperiencia = moment().diff('2015-07-01', 'years')
            })
        }

        // Si la sección ya está activa al cargar (navegación directa a #about)
        if (section.classList.contains('active')) {
            trigger()
            return
        }

        // Observa cuando arshia.js agrega la clase "active" a la sección
        const observer = new MutationObserver(() => {
            if (section.classList.contains('active') && !this.animated) {
                trigger()
                observer.disconnect()
            }
        })
        observer.observe(section, { attributes: true, attributeFilter: ['class'] })
    }

    private calcDiasHabiles(): number {
        const inicio = moment('2015-07-01')
        const hoy = moment()
        let dias = 0
        const current = inicio.clone()
        while (current.isSameOrBefore(hoy, 'day')) {
            if (current.day() !== 0 && current.day() !== 6) dias++
            current.add(1, 'day')
        }
        return dias
    }

    fetchGitHubLanguages() {
        const CACHE_KEY = 'gh_languages'
        const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 horas

        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
            const { data, timestamp } = JSON.parse(cached)
            if (Date.now() - timestamp < CACHE_TTL) {
                this.githubLanguages = data
                this.githubLoading = false
                return
            }
        }

        const username = 'soynerin'
        this.http
            .get<
                any[]
            >(`https://api.github.com/users/${username}/repos?per_page=100`)
            .subscribe({
                next: (repos) => {
                    const filtered = repos.filter((r) => !r.fork)
                    if (filtered.length === 0) {
                        this.githubLoading = false
                        return
                    }
                    const requests = filtered.map((r) =>
                        this.http.get<{ [key: string]: number }>(
                            r.languages_url
                        )
                    )
                    forkJoin(requests).subscribe({
                        next: (results) => {
                            const totals: { [key: string]: number } = {}
                            results.forEach((langs) => {
                                Object.entries(langs).forEach(
                                    ([lang, bytes]) => {
                                        totals[lang] =
                                            (totals[lang] || 0) +
                                            (bytes as number)
                                    }
                                )
                            })
                            const totalBytes = Object.values(totals).reduce(
                                (a, b) => a + b,
                                0
                            )
                            this.githubLanguages = Object.entries(totals)
                                .map(([name, bytes]) => ({
                                    name,
                                    percent: Math.round(
                                        (bytes / totalBytes) * 100
                                    ),
                                }))
                                .sort((a, b) => b.percent - a.percent)
                                .slice(0, 4)
                            localStorage.setItem(
                                CACHE_KEY,
                                JSON.stringify({
                                    data: this.githubLanguages,
                                    timestamp: Date.now(),
                                })
                            )
                            this.githubLoading = false
                        },
                        error: () => {
                            this.githubLoading = false
                        },
                    })
                },
                error: () => {
                    this.githubLoading = false
                },
            })
    }


}
