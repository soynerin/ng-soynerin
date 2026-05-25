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
    const subject = isReply ? `Nueva respuesta en "${record.post_slug}"` : `Nuevo comentario en "${record.post_slug}"`

    const emailRes = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            from: 'Blog Neri <onboarding@resend.dev>',
            to: [OWNER_EMAIL],
            subject,
            html: `<h2>${isReply ? 'Nueva respuesta' : 'Nuevo comentario'}</h2><p><strong>Post:</strong> ${record.post_slug}</p><p><strong>Autor:</strong> ${record.author_name}</p><p>${record.author_email ?? ''}</p><blockquote>${record.content}</blockquote>`,
        }),
    })
    if (!emailRes.ok) return new Response(await emailRes.text(), { status: 500 })
    return new Response('OK', { status: 200 })
})
