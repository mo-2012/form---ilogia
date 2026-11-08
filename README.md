# iLogia institutional registration portal

Static, Arabic-first HTML/CSS/JavaScript website and a Supabase Edge Function backend. No npm, Node.js, build step, or frontend secrets are required.

## Files

- `index.html`, `styles.css`, `app.js`: responsive bilingual registration portal.
- `public/ilogia-mark.svg`: iLogia-branded school mark.
- `supabase/functions/institution-applications/index.ts`: validated, server-side application endpoint.
- `supabase/migrations/202611080001_institution_applications.sql`: application table, access policies, and atomic rate limiter.

## Connect the backend

1. In the **existing iLogia Supabase project**, apply `supabase/migrations/202611080001_institution_applications.sql` from the Supabase SQL Editor. It creates a new application table and rate-limit table; it does not change existing tables.
2. Set up Supabase CLI on the deployment machine (no npm is needed if you install its standalone Windows binary). Link it to the existing project and deploy:

   ```text
   supabase link --project-ref YOUR_PROJECT_REF
   supabase functions deploy institution-applications
   supabase secrets set PORTAL_ORIGIN=https://form.ilogia-eg.com
   ```

   Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to the Edge Function. The service-role key is used only server-side and must never be copied into `app.js`, HTML, or hosting environment variables exposed to the browser. The function is intentionally public (`verify_jwt = false`); it validates every field, checks the portal origin, uses a honeypot, rate-limits requests in the database, and supports idempotent retries.
3. In `app.js`, replace `YOUR_PROJECT_REF` in `EDGE_FUNCTION_URL` and `YOUR_SUPABASE_ANON_KEY` in `SUPABASE_ANON_KEY` with the existing project reference and its public anon/publishable key. This public key is intended for browser use; the service-role key remains exclusively in the Edge Function.
4. Publish `index.html`, `styles.css`, `app.js`, and `public/ilogia-mark.svg` to static hosting, then point `form.ilogia-eg.com` to that host. Keep the main iLogia site and existing database structure unchanged.

The database permits application writes only via the server-side service role. Direct `anon` and `authenticated` table access is revoked. Each hashed client IP is limited to five submissions per 15-minute window; if the edge platform does not provide a client address, the email hash is used instead. Configure the production proxy to overwrite forwarded-IP headers so clients cannot choose the rate-limit address.
