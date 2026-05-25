import { Component, OnInit, OnDestroy } from '@angular/core'
import { ViewEncapsulation } from '@angular/core'
import { Subscription } from 'rxjs'
import { BlogOverlayService, BlogPost } from '../../services/blog-overlay.service'
import { CommentService, Comment } from '../../services/comment.service'
import { isValidEmail } from '../../utils/validators'

@Component({
    selector: 'app-blog-overlay',
    templateUrl: './blog-overlay.component.html',
    styleUrls: ['./blog-overlay.component.css'],
    standalone: false,
    encapsulation: ViewEncapsulation.None,
})
export class BlogOverlayComponent implements OnInit, OnDestroy {
    post: BlogPost | null = null
    readOnly = false
    private sub!: Subscription
    private readOnlySub!: Subscription

    // Comentarios
    comments: Comment[] = []
    commentsLoading = false

    // Formulario nuevo comentario
    newName = ''
    newEmail = ''
    newContent = ''
    submitting = false
    emailInvalid = false

    // Reply inline
    replyingTo: string | null = null
    replyContent = ''
    replySubmitting = false

    constructor(
        private overlayService: BlogOverlayService,
        public commentService: CommentService
    ) {}

    ngOnInit(): void {
        this.sub = this.overlayService.post$.subscribe((p) => {
            this.post = p
            if (p) {
                document.body.style.overflow = 'auto'
                this.loadComments(p.slug)
            } else {
                document.body.style.overflow = ''
                this.comments = []
            }
        })
        this.readOnlySub = this.overlayService.readOnly$.subscribe((v) => {
            this.readOnly = v
        })
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
        this.readOnlySub.unsubscribe()
    }

    loadComments(slug: string): void {
        this.commentsLoading = true
        this.commentService.getComments(slug).subscribe({
            next: (data) => {
                this.comments = data
                this.commentsLoading = false
            },
            error: () => { this.commentsLoading = false },
        })
    }

    submitComment(): void {
        if (!this.post || !this.newName.trim() || !this.newContent.trim()) return
        if (this.newEmail.trim() && !this.isValidEmail(this.newEmail)) {
            this.emailInvalid = true
            return
        }
        this.emailInvalid = false
        this.submitting = true
        this.commentService.addComment({
            post_slug: this.post.slug,
            author_name: this.newName.trim(),
            author_email: this.newEmail.trim() || null,
            content: this.newContent.trim(),
        }).subscribe({
            next: () => {
                this.newName = ''
                this.newEmail = ''
                this.newContent = ''
                this.submitting = false
                this.emailInvalid = false
                this.loadComments(this.post!.slug)
            },
            error: () => { this.submitting = false },
        })
    }

    startReply(commentId: string): void {
        this.replyingTo = this.replyingTo === commentId ? null : commentId
        this.replyContent = ''
    }

    isValidEmail = isValidEmail

    submitReply(parentId: string, nameInput: HTMLInputElement): void {
        if (!this.post || !this.replyContent.trim()) return
        if (!this.newName.trim()) {
            nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
            nameInput.focus()
            nameInput.classList.add('input-error')
            setTimeout(() => nameInput.classList.remove('input-error'), 2000)
            return
        }
        if (this.newEmail.trim() && !this.isValidEmail(this.newEmail)) {
            this.emailInvalid = true
            return
        }
        this.emailInvalid = false
        this.replySubmitting = true
        this.commentService.addComment({
            post_slug: this.post.slug,
            parent_id: parentId,
            author_name: this.newName.trim(),
            author_email: this.newEmail.trim() || null,
            content: this.replyContent.trim(),
        }).subscribe({
            next: () => {
                this.replyingTo = null
                this.replyContent = ''
                this.replySubmitting = false
                this.loadComments(this.post!.slug)
            },
            error: () => { this.replySubmitting = false },
        })
    }

    likeComment(comment: Comment): void {
        if (this.commentService.hasLiked(comment.id)) return
        const fp = this.commentService.getOrCreateFingerprint()
        this.commentService.likeComment(comment.id, fp).subscribe({
            next: () => {
                this.commentService.markLiked(comment.id)
                comment.likes_count++
            },
        })
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
