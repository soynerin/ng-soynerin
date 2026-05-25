import { escapeHtml } from '../_shared/utils.ts'

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json',
}

const RESEND_API_URL = 'https://api.resend.com/emails'
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const OWNER_EMAIL = Deno.env.get('OWNER_EMAIL') ?? ''


Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: CORS_HEADERS })
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: CORS_HEADERS })
    }

    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: CORS_HEADERS })
    }

    const html = `
        <h3>Nuevo mensaje de soyNerin.dev</h3>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message)}</p>
    `

    const res = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Contacto soyNerin.dev <onboarding@resend.dev>',
            to: [OWNER_EMAIL],
            subject: `[Contacto] ${escapeHtml(subject)}`,
            html,
        }),
    })

    if (!res.ok) {
        const err = await res.text()
        console.error('Resend error:', err)
        return new Response(JSON.stringify({ error: err }), { status: 500, headers: CORS_HEADERS })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: CORS_HEADERS })
})
