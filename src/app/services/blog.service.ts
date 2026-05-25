import { Injectable } from '@angular/core'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { BlogPost } from './blog-overlay.service'
import { SupabaseService } from './supabase.service'

export interface AdminPost {
    slug: string
    title: string
    category: string
    date: string
    previewImg: string
    body: string
    quote: string
    bodyExtra: string
    published: boolean
}

@Injectable({ providedIn: 'root' })
export class BlogService {
    private get db() {
        return this.supabase.client
    }

    constructor(private supabase: SupabaseService) {}

    getAllPosts(): Observable<AdminPost[]> {
        return from(
            this.db
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false })
        ).pipe(
            map(({ data, error }: any) => {
                if (error) throw error
                return (data ?? []).map((row: any) => ({
                    slug: row.slug,
                    title: row.title,
                    category: row.category ?? '',
                    date: row.date ?? '',
                    previewImg: row.preview_img ?? '',
                    body: row.body ?? '',
                    quote: row.quote ?? '',
                    bodyExtra: row.body_extra ?? '',
                    published: row.published ?? false,
                })) as AdminPost[]
            })
        )
    }

    getPosts(): Observable<BlogPost[]> {
        return from(
            this.db
                .from('posts')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false })
        ).pipe(
            map(({ data, error }: any) => {
                if (error) throw error
                return (data ?? []).map((row: any) => ({
                    slug: row.slug,
                    title: row.title,
                    category: row.category,
                    date: row.date,
                    previewImg: row.preview_img,
                    body: row.body,
                    quote: row.quote,
                    section: row.section,
                    bullets: row.bullets ?? [],
                    bodyExtra: row.body_extra,
                })) as BlogPost[]
            })
        )
    }
}
