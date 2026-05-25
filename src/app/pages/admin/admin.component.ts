import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import Swal from 'sweetalert2'
import { SupabaseService } from '../../services/supabase.service'
import { BlogService, AdminPost } from '../../services/blog.service'
import { BlogOverlayService, BlogPost } from '../../services/blog-overlay.service'

type AdminView = 'login' | 'dashboard' | 'editor'

interface PostForm {
    id?: string
    title: string
    slug: string
    category: string
    date: string
    previewImg: string
    body: string
    quote: string
    bodyExtra: string
    published: boolean
}

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: false,
})
export class AdminComponent implements OnInit, OnDestroy {
    visible = false
    view: AdminView = 'login'

    // Auth
    loginEmail = ''
    loginPassword = ''
    loginError = ''
    loggingIn = false
    rememberMe = false
    private readonly REMEMBER_KEY = 'admin_remember'

    // Dashboard
    posts: AdminPost[] = []
    postsLoading = false
    postsError = ''

    // Editor
    form: PostForm = this.emptyForm()
    saving = false
    saveError = ''

    private routerSub?: Subscription
    private readonly onHashChange = () => this.check()

    constructor(
        private supabase: SupabaseService,
        private blogService: BlogService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private blogOverlay: BlogOverlayService
    ) {
        // Set visible synchronously before the view is created so the
        // initial *ngIf renders correctly on the first change-detection pass.
        this.visible = this.isAdminPath()
    }

    ngOnInit(): void {
        // Restore saved credentials
        try {
            const saved = localStorage.getItem(this.REMEMBER_KEY)
            if (saved) {
                const parsed = JSON.parse(saved)
                this.loginEmail = parsed.email ?? ''
                this.loginPassword = parsed.password ?? ''
                this.rememberMe = true
            }
        } catch { /* ignore */ }

        // Re-check after view exists (cdr.detectChanges is safe here)
        this.check()

        // React to Angular router navigations
        this.routerSub = this.router.events
            .pipe(filter((e) => e instanceof NavigationEnd))
            .subscribe(() => this.check())

        // React to browser hash changes (zone.js patches addEventListener)
        window.addEventListener('hashchange', this.onHashChange)
    }

    ngOnDestroy(): void {
        this.routerSub?.unsubscribe()
        window.removeEventListener('hashchange', this.onHashChange)
    }

    private isAdminPath(): boolean {
        // Normalize '#/admin' and '#admin' → 'admin'
        const hash = window.location.hash.replace(/^#\/?/, '')
        return hash === 'admin' || hash.startsWith('admin/')
    }

    private check(): void {
        const wasVisible = this.visible
        this.visible = this.isAdminPath()
        this.cdr.detectChanges()

        if (this.visible && !wasVisible) {
            this.supabase.client.auth.getSession().then(({ data }) => {
                this.view = data.session ? 'dashboard' : 'login'
                if (this.view === 'dashboard') this.loadPosts()
                this.cdr.detectChanges()
            })
        }
    }

    private emptyForm(): PostForm {
        return { title: '', slug: '', category: '', date: '', previewImg: '', body: '', quote: '', bodyExtra: '', published: false }
    }

    async login(): Promise<void> {
        this.loggingIn = true
        this.loginError = ''
        const { error } = await this.supabase.client.auth.signInWithPassword({
            email: this.loginEmail,
            password: this.loginPassword,
        })
        this.loggingIn = false
        if (error) {
            this.loginError = 'Email o contraseña incorrectos.'
        } else {
            if (this.rememberMe) {
                localStorage.setItem(this.REMEMBER_KEY, JSON.stringify({ email: this.loginEmail, password: this.loginPassword }))
            } else {
                localStorage.removeItem(this.REMEMBER_KEY)
            }
            this.view = 'dashboard'
            this.loadPosts()
        }
    }

    async logout(): Promise<void> {
        await this.supabase.client.auth.signOut()
        this.view = 'login'
        window.location.hash = 'hero'
    }

    loadPosts(): void {
        this.postsLoading = true
        this.postsError = ''
        this.blogService.getAllPosts().subscribe({
            next: (posts) => { this.posts = posts; this.postsLoading = false; this.cdr.detectChanges() },
            error: (err) => {
                this.postsError = err?.message || 'Error al cargar posts. Verificá las políticas RLS en Supabase.'
                this.postsLoading = false
                this.cdr.detectChanges()
            },
        })
    }

    viewPost(post: AdminPost): void {
        const blogPost: BlogPost = {
            slug: post.slug,
            title: post.title,
            category: post.category,
            date: post.date,
            previewImg: post.previewImg,
            body: post.body,
            quote: post.quote,
            section: '',
            bullets: [],
            bodyExtra: post.bodyExtra,
        }
        this.blogOverlay.open(blogPost, true)
    }

    newPost(): void {
        this.form = this.emptyForm()
        this.saveError = ''
        this.view = 'editor'
    }

    editPost(post: AdminPost): void {
        this.form = {
            id: post.slug,           // store original slug as the edit key
            title: post.title,
            slug: post.slug,
            category: post.category ?? '',
            date: post.date ?? '',
            previewImg: post.previewImg ?? '',
            body: post.body ?? '',
            quote: post.quote ?? '',
            bodyExtra: post.bodyExtra ?? '',
            published: post.published,
        }
        this.saveError = ''
        this.view = 'editor'
    }

    generateSlug(): void {
        this.form.slug = this.form.title
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
    }

    async savePost(): Promise<void> {
        if (!this.form.title.trim() || !this.form.slug.trim()) return
        this.saving = true
        this.saveError = ''
        const payload = {
            title: this.form.title.trim(),
            slug: this.form.slug.trim(),
            category: this.form.category.trim() || null,
            date: this.form.date || null,
            preview_img: this.form.previewImg.trim() || null,
            body: this.form.body || null,
            quote: this.form.quote.trim() || null,
            body_extra: this.form.bodyExtra || null,
            published: this.form.published,
        }
        const { error } = this.form.id
            ? await this.supabase.client.from('posts').update(payload).eq('slug', this.form.id)
            : await this.supabase.client.from('posts').insert(payload)
        this.saving = false
        if (error) {
            this.saveError = error.message
        } else {
            this.view = 'dashboard'
            this.loadPosts()
        }
    }

    async deletePost(slug: string): Promise<void> {
        const result = await Swal.fire({
            title: '¿Eliminar post?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#2c2d30',
            color: '#e1e1e1',
            confirmButtonColor: '#e53935',
            cancelButtonColor: '#555',
        })
        if (!result.isConfirmed) return
        await this.supabase.client.from('posts').delete().eq('slug', slug)
        this.loadPosts()
    }

    async togglePublish(post: AdminPost): Promise<void> {
        await this.supabase.client.from('posts').update({ published: !post.published }).eq('slug', post.slug)
        post.published = !post.published
    }

    backToDashboard(): void {
        this.view = 'dashboard'
    }
}
