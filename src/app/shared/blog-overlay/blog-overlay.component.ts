import { Component, OnInit, OnDestroy } from '@angular/core'
import { ViewEncapsulation } from '@angular/core'
import { Subscription } from 'rxjs'
import { BlogOverlayService, BlogPost } from '../../services/blog-overlay.service'

@Component({
    selector: 'app-blog-overlay',
    templateUrl: './blog-overlay.component.html',
    styleUrls: ['./blog-overlay.component.css'],
    standalone: false,
    encapsulation: ViewEncapsulation.None,
})
export class BlogOverlayComponent implements OnInit, OnDestroy {
    post: BlogPost | null = null
    private sub!: Subscription

    constructor(private overlayService: BlogOverlayService) {}

    ngOnInit(): void {
        this.sub = this.overlayService.post$.subscribe((p) => {
            this.post = p
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
        if (!this.post) return
        const posts = this.overlayService.getPosts()
        const idx = posts.findIndex((p) => p.slug === this.post!.slug)
        this.overlayService.open(posts[(idx - 1 + posts.length) % posts.length])
    }

    next(): void {
        if (!this.post) return
        const posts = this.overlayService.getPosts()
        const idx = posts.findIndex((p) => p.slug === this.post!.slug)
        this.overlayService.open(posts[(idx + 1) % posts.length])
    }
}
