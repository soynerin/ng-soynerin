## Plan: Blog dinámico con Supabase, comentarios y notificaciones

**TL;DR:** Migrar los posts de hardcodeados a Supabase (PostgreSQL). Comentarios anónimos con hilos y likes. Notificaciones vía Supabase Edge Functions + Resend. El cliente Angular se conecta directamente con el SDK de Supabase — sin backend extra, el Vercel API actual no se toca.

---

### Stack recomendado

| Capa | Tecnología | Por qué |
|---|---|---|
| Base de datos | **Supabase** | PostgreSQL, RLS, Realtime, free tier, SDK Angular-friendly |
| Email | **Resend.com** | 3.000 mails/mes gratis, integra nativamente con Supabase Edge Functions |
| Notificaciones | **Supabase Edge Functions** | Se disparan con Database Webhooks en INSERT, sin servidor extra |
| CMS de posts | **Supabase Table Editor** | No necesitás un panel admin propio — editás directo en la tabla |
| Likes (deduplicación) | **localStorage** | Sin login, sin complejidad extra |
| Tiempo real (nice-to-have) | **Supabase Realtime** | Comentarios en vivo sin necesidad de refresh manual |

---

### Fase 1 — Supabase Setup

**1.** Crear proyecto en supabase.com (free tier)

**2.** Crear tabla `posts`:
```
slug (text, PK) | title | category | date | preview_img
body | quote | section | bullets (text[]) | body_extra
published (bool, default true) | created_at
```

**3.** Crear tabla `comments`:
```
id (uuid PK) | post_slug (FK → posts.slug)
parent_id (uuid nullable, self-referencia para replies)
author_name (required) | author_email (nullable)
content | created_at | likes_count (int, default 0)
```

**4.** Crear tabla `comment_likes`:
```
id (uuid) | comment_id (FK) | fingerprint (text) | created_at
UNIQUE (comment_id, fingerprint) — evita likes duplicados
```

**5.** Configurar **Row Level Security**:
- `posts`: SELECT público / INSERT+UPDATE solo `service_role`
- `comments`: SELECT público / INSERT público sin auth / DELETE solo `service_role`
- `comment_likes`: SELECT+INSERT público

**6.** Poblar `posts` con los 4 posts actuales de `blog.component.ts`

**7.** Obtener `SUPABASE_URL` y `SUPABASE_ANON_KEY`

---

### Fase 2 — Angular: SDK y configuración

**8.** `npm install @supabase/supabase-js`

**9.** Agregar a `environment.ts` y `environment.prod.ts`:
```ts
supabaseUrl: '...', supabaseKey: '...'
```

**10.** Crear `supabase.service.ts` — wrapper singleton del cliente (`createClient`)

**11.** Crear `blog.service.ts`:
- `getPosts()` → SELECT from `posts` WHERE `published=true`
- `getPost(slug)` → SELECT single

**12.** Crear `comment.service.ts`:
- `getComments(postSlug)` → SELECT + ORDER BY `created_at`
- `addComment(data)` → INSERT
- `addReply(data, parentId)` → INSERT con `parent_id`
- `likeComment(commentId, fingerprint)` → INSERT en `comment_likes` + increment via RPC de Supabase

---

### Fase 3 — Blog: de estático a dinámico

**13.** `BlogComponent`: reemplazar el array hardcodeado por `BlogService.getPosts()` en `ngOnInit()`

**14.** Mantener el patrón `BehaviorSubject` del `BlogOverlayService` — solo cambia la fuente de datos

**15.** Agregar loading state (el componente `app-loading` ya existe en el proyecto)

---

### Fase 4 — UI de comentarios en el overlay

**16.** `blog-overlay.component.html` — la sección "Dejar un comentario" ya existe, conectarla:
- Lista de comentarios existentes (replies anidadas un nivel)
- Submit del form → `CommentService.addComment()`
- Botón "Responder" por comentario → sub-form inline
- Botón "👍 N" con check de localStorage para deshabilitar si ya likeó

**17.** `blog-overlay.component.ts`:
- Al abrir un post (suscripción a `post$`) → fetchear comentarios
- Fingerprint de likes: `localStorage.getItem('comment_fp') || generateUUID()` → persistir

---

### Fase 5 — Notificaciones con Edge Functions + Resend

**18.** Crear cuenta en [resend.com](https://resend.com), obtener API key

**19.** Edge Function `notify-owner`:
- **Trigger**: Database Webhook → INSERT en `comments`
- **Acción**: email a `neri.agustin.es@outlook.com` con nombre, post title, contenido y link

**20.** Edge Function `notify-commenter-reply`:
- **Trigger**: INSERT en `comments` WHERE `parent_id IS NOT NULL`
- **Acción**: busca el comentario padre → si tiene email → notifica que le respondieron

**21.** Edge Function `notify-commenter-like` *(opcional)*:
- **Trigger**: INSERT en `comment_likes`
- **Acción**: si el comentario tiene email → notifica que le dieron like

**22.** Configurar secrets en Supabase Dashboard: `RESEND_API_KEY`, `OWNER_EMAIL`

---

### Archivos a modificar / crear

| Archivo | Cambio |
|---|---|
| `environments/environment*.ts` | Agregar Supabase config |
| `pages/blog/blog.component.ts` | Reemplazar array por `BlogService` |
| `shared/blog-overlay/blog-overlay.component.ts` | Integrar `CommentService` |
| `shared/blog-overlay/blog-overlay.component.html` | UI completa de comentarios |
| *(nuevo)* `services/supabase.service.ts` | Cliente Supabase |
| *(nuevo)* `services/blog.service.ts` | CRUD de posts |
| *(nuevo)* `services/comment.service.ts` | CRUD de comentarios + likes |
| *(nuevas)* `supabase/functions/notify-*/index.ts` | Edge Functions (3) |

---

### Verificación

1. Editar un post en Supabase dashboard → el blog lo muestra actualizado
2. Agregar comentario sin email → aparece en lista → fila en tabla `comments`
3. Responder comentario → aparece anidado bajo el original
4. Like → contador +1 → recargar → botón deshabilitado
5. Comentario nuevo → email llega a outlook en < 60s
6. Reply a comentario con email → autor recibe notificación

---

### Decisiones

- Sin login para comentar: solo nombre (requerido) + email (opcional, para notificaciones)
- Likes por localStorage, sin IP — simple y funcional para un portfolio
- CMS = Supabase dashboard, sin panel admin propio
- Scope excluido: paginación, búsqueda, tags, RSS, markdown enriquecido

### Consideraciones adicionales

1. **Rich text en posts**: Si querés escribir con markdown (negritas, listas, código), se agrega `ngx-markdown` al frontend y guardás el contenido en markdown en Supabase. No bloquea nada, se puede agregar después.
2. **Moderación de comentarios**: Agregar `is_approved (bool default true)` a `comments` y manejarlo desde el Supabase dashboard o desde el mismo email de notificación con un link de aprobación. Recomendable antes de ir a producción.
3. **Imágenes de posts**: Supabase Storage para subir banners reales por post en lugar del placeholder SVG actual. Se habilita un bucket público y se referencia la URL en `preview_img`.
