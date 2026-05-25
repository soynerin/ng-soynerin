// Type declarations for Deno runtime APIs used in Supabase Edge Functions

declare namespace Deno {
    const env: {
        get(key: string): string | undefined
    }
    function serve(handler: (req: Request) => Response | Promise<Response>): void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare module 'https://esm.sh/@supabase/supabase-js@2' {
    export * from '@supabase/supabase-js'
}
