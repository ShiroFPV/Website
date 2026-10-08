// Contact form backend for shirofpv.com.
// Verifies a Turnstile token, then emails the message to the verified
// destination address bound as EMAIL. Reply-To is the sender, so replying
// from the inbox goes straight back to them.

const ALLOWED_ORIGINS = [
  'https://shirofpv.com',
  'https://www.shirofpv.com',
  'https://shirofpv.dev',
  'http://localhost:5173',
]

const LIMITS = { name: 100, email: 200, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function cors(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  }
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors(origin) },
  })
}

async function verifyTurnstile(token, ip, secret) {
  const form = new FormData()
  form.append('secret', secret)
  form.append('response', token)
  if (ip) form.append('remoteip', ip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })
  const data = await res.json()
  return data.success === true
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) })
    if (url.pathname !== '/' || request.method !== 'POST') return json({ success: false, message: 'Not found' }, 404, origin)
    if (!ALLOWED_ORIGINS.includes(origin)) return json({ success: false, message: 'Origin not allowed' }, 403, origin)

    let body
    try {
      body = await request.json()
    } catch {
      return json({ success: false, message: 'Invalid JSON' }, 400, origin)
    }

    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const message = String(body.message || '').trim()
    const token = String(body.turnstileToken || '')

    if (!name || !email || !message) return json({ success: false, message: 'Please fill in every field.' }, 400, origin)
    if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
      return json({ success: false, message: 'Message is too long.' }, 400, origin)
    }
    if (!EMAIL_RE.test(email)) return json({ success: false, message: 'That email address looks wrong.' }, 400, origin)

    const human = await verifyTurnstile(token, request.headers.get('CF-Connecting-IP'), env.TURNSTILE_SECRET)
    if (!human) return json({ success: false, message: 'Spam check failed. Please try again.' }, 400, origin)

    try {
      await env.EMAIL.send({
        to: env.DESTINATION,
        from: { email: 'contact@shirofpv.com', name: 'ShiroFPV Contact Form' },
        replyTo: { email, name },
        subject: `New message from ${name} via ${new URL(origin).hostname}`,
        text: `From: ${name} <${email}>\nSent via: ${origin}\n\n${message}`,
      })
    } catch (e) {
      console.error('send failed', e.code, e.message)
      return json({ success: false, message: 'Could not send right now.' }, 502, origin)
    }

    return json({ success: true }, 200, origin)
  },
}
