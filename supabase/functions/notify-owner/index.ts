import { escapeHtml } from '../_shared/utils.ts'

const RESEND_API_URL = 'https://api.resend.com/emails'
const OWNER_EMAIL = Deno.env.get('OWNER_EMAIL') ?? ''
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''

Deno.serve(async (req) => {
    if (req.method !== 'POST')
        return new Response('Method not allowed', { status: 405 })

    const payload = await req.json()
    const record = payload.record
    if (!record) return new Response('No record', { status: 400 })

    const isReply = !!record.parent_id
    const subject = isReply
        ? `Nueva respuesta en "${escapeHtml(record.post_slug)}"`
        : `Nuevo comentario en "${escapeHtml(record.post_slug)}"`

    const html = `
        <h2>${isReply ? 'Nueva respuesta' : 'Nuevo comentario'} en tu blog</h2>
        <p><strong>Post:</strong> ${escapeHtml(record.post_slug)}</p>
        <p><strong>Autor:</strong> ${escapeHtml(record.author_name)}</p>
        ${record.author_email ? `<p><strong>Email:</strong> ${escapeHtml(record.author_email)}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <blockquote style="border-left:3px solid #c8a951;padding:8px 16px;margin:16px 0;">
            ${escapeHtml(record.content)}
        </blockquote>
    `

    const emailRes = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            from: 'Blog Neri <onboarding@resend.dev>',
            to: [OWNER_EMAIL],
            subject,
            html,
        }),
    })
    if (!emailRes.ok) return new Response(await emailRes.text(), { status: 500 })
    return new Response('OK', { status: 200 })
})
