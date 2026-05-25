import { Component, OnInit } from '@angular/core'
import { BlogOverlayService, BlogPost } from '../../services/blog-overlay.service'
import { BlogService } from '../../services/blog.service'

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    standalone: false,
})
export class BlogComponent implements OnInit {
    posts: BlogPost[] = []
    loading = true

    constructor(
        private overlayService: BlogOverlayService,
        private blogService: BlogService
    ) {}

    ngOnInit(): void {
        this.blogService.getPosts().subscribe({
            next: (posts) => {
                this.posts = posts
                this.overlayService.setPosts(posts)
                this.loading = false
            },
            error: () => {
                this.loading = false
            },
        })
    }

    openPost(post: BlogPost): void {
        this.overlayService.open(post)
    }
}
