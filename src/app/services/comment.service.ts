import { Injectable } from '@angular/core'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SupabaseService } from './supabase.service'

export interface Comment {
    id: string
    post_slug: string
    parent_id: string | null
    author_name: string
    author_email: string | null
    content: string
    likes_count: number
    created_at: string
    replies?: Comment[]
}

export interface NewComment {
    post_slug: string
    parent_id?: string | null
    author_name: string
    author_email?: string | null
    content: string
}

@Injectable({ providedIn: 'root' })
export class CommentService {
    private get db() {
        return this.supabase.client
    }

    constructor(private supabase: SupabaseService) {}

    getComments(postSlug: string): Observable<Comment[]> {
        return from(
            this.db
                .from('comments')
                .select('*')
                .eq('post_slug', postSlug)
                .order('created_at', { ascending: true })
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error
                const flat: Comment[] = data ?? []
                // Anidar replies bajo su comentario padre
                const roots = flat.filter((c) => !c.parent_id)
                roots.forEach((root) => {
                    root.replies = flat.filter((c) => c.parent_id === root.id)
                })
                return roots
            })
        )
    }

    addComment(comment: NewComment): Observable<Comment> {
        return from(
            this.db
                .from('comments')
                .insert({
                    post_slug: comment.post_slug,
                    parent_id: comment.parent_id ?? null,
                    author_name: comment.author_name,
                    author_email: comment.author_email ?? null,
                    content: comment.content,
                })
                .select()
                .single()
        ).pipe(
            map(({ data, error }) => {
                if (error) throw error
                return data as Comment
            })
        )
    }

    likeComment(commentId: string, fingerprint: string): Observable<void> {
        return from(
            this.db
                .from('comment_likes')
                .insert({ comment_id: commentId, fingerprint })
                .then(({ error }) => {
                    if (error) throw error
                    return this.db.rpc('increment_likes', {
                        comment_id: commentId,
                    })
                })
                .then(({ error }: { error: any }) => {
                    if (error) throw error
                })
        )
    }

    getOrCreateFingerprint(): string {
        const key = 'comment_fp'
        let fp = localStorage.getItem(key)
        if (!fp) {
            fp = crypto.randomUUID()
            localStorage.setItem(key, fp)
        }
        return fp
    }

    hasLiked(commentId: string): boolean {
        const liked: string[] = JSON.parse(
            localStorage.getItem('liked_comments') ?? '[]'
        )
        return liked.includes(commentId)
    }

    markLiked(commentId: string): void {
        const liked: string[] = JSON.parse(
            localStorage.getItem('liked_comments') ?? '[]'
        )
        liked.push(commentId)
        localStorage.setItem('liked_comments', JSON.stringify(liked))
    }
}
