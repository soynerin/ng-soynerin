import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { escapeHtml } from '../_shared/utils.ts'

const RESEND_API_URL = 'https://api.resend.com/emails'
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

Deno.serve(async (req) => {
    if (req.method !== 'POST')
        return new Response('Method not allowed', { status: 405 })

    const payload = await req.json()
    const record = payload.record

    if (!record?.parent_id) return new Response('Not a reply', { status: 200 })

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    const { data: parent, error } = await supabase
        .from('comments')
        .select('author_name, author_email')
        .eq('id', record.parent_id)
        .single()

    if (error || !parent?.author_email)
        return new Response('No email to notify', { status: 200 })

    const res = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Blog Neri <onboarding@resend.dev>',
            to: [parent.author_email],
            subject: `${escapeHtml(record.author_name)} respondió tu comentario`,
            html: `
                <h2>${escapeHtml(record.author_name)} respondi&oacute; tu comentario</h2>
                <p><strong>Post:</strong> ${escapeHtml(record.post_slug)}</p>
                <p><strong>Su respuesta:</strong></p>
                <blockquote style="border-left:3px solid #c8a951;padding:8px 16px;margin:16px 0;">
                    ${escapeHtml(record.content)}
                </blockquote>
                <p><a href="https://soynerin.netlify.app/#blog">Ver en el blog</a></p>
            `,
        }),
    })

    if (!res.ok) {
        const err = await res.text()
        console.error('Resend error:', err)
        return new Response(err, { status: 500 })
    }

    return new Response('OK', { status: 200 })
})
