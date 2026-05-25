import { Injectable } from '@angular/core'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { BlogPost } from './blog-overlay.service'
import { SupabaseService } from './supabase.service'

@Injectable({ providedIn: 'root' })
export class BlogService {
    private get db() {
        return this.supabase.client
    }

    constructor(private supabase: SupabaseService) {}

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
