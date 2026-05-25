import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface BlogPost {
    slug: string
    title: string
    category: string
    date: string
    previewImg: string
    body: string
    quote: string
    section: string
    bullets: string[]
    bodyExtra: string
}

@Injectable({ providedIn: 'root' })
export class BlogOverlayService {
    private postSubject = new BehaviorSubject<BlogPost | null>(null)
    post$ = this.postSubject.asObservable()
    private readOnlySubject = new BehaviorSubject<boolean>(false)
    readOnly$ = this.readOnlySubject.asObservable()
    private posts: BlogPost[] = []

    setPosts(posts: BlogPost[]): void {
        this.posts = posts
    }

    getPosts(): BlogPost[] {
        return this.posts
    }

    open(post: BlogPost, readOnly = false): void {
        this.readOnlySubject.next(readOnly)
        this.postSubject.next(post)
    }

    close(): void {
        this.readOnlySubject.next(false)
        this.postSubject.next(null)
    }

    current(): BlogPost | null {
        return this.postSubject.getValue()
    }
}
