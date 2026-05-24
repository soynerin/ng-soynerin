import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { forkJoin } from 'rxjs'
import moment from 'moment'

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false,
})
export class AboutComponent implements OnInit {
    edad: number = 0
    tazasDeCafe: any
    proyectosTerminados: any
    clientesFelices: any
    aniosExperiencia: any
    githubLanguages: { name: string; percent: number }[] = []
    githubLoading = true

    constructor(private http: HttpClient) {
        this.contadorTazasCafe()
        this.contadorProyectosTerminados()
        this.contadorClientesFelices()
        this.contadorAniosExperiencia()
    }

    ngOnInit(): void {
        this.edad = moment().diff('1989-05-09', 'years')
        this.fetchGitHubLanguages()
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

    contadorTazasCafe() {
        const primerDiaTrabajo = moment('2015-01-09')
        const dias = moment().diff(primerDiaTrabajo, 'days')
        this.tazasDeCafe = { countTo: dias, from: 0, duration: 10 }
    }

    contadorProyectosTerminados() {
        this.proyectosTerminados = { countTo: 12, from: 0, duration: 5 }
    }

    contadorClientesFelices() {
        this.clientesFelices = { countTo: 8, from: 0, duration: 5 }
    }

    contadorAniosExperiencia() {
        const inicio = moment('2015-01-09')
        this.aniosExperiencia = {
            countTo: moment().diff(inicio, 'years'),
            from: 0,
            duration: 5,
        }
    }
}
