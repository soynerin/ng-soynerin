import { Injectable } from '@angular/core'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class SupabaseService {
    readonly client: SupabaseClient = createClient(
        environment.supabaseUrl,
        environment.supabaseKey,
        {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: false,
                // Bypass navigator.locks to prevent Zone.js from surfacing
                // internal LockAcquireTimeoutErrors as unhandled rejections.
                // Safe for single-tab SPAs.
                lock: <R>(_name: string, _timeout: number, fn: () => Promise<R>) => fn(),
            },
        }
    )
}
