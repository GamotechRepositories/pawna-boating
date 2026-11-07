# Pawna content backend

## Create the tables and APIs

1. Open your Supabase project → SQL Editor → New query.
2. Run `migrations/202611070001_content_api.sql` once. It creates all three tables, API grants, indexes, and row level security policies in a transaction. It intentionally fails if these tables already exist rather than altering existing data.
3. Run `seed.sql` to import the current frontend content: four stays, seven videos, and nine review excerpts. Seeds can be rerun without duplicating IDs or overwriting dashboard edits.
4. Ensure the Data API is enabled and `public` is an exposed schema in the project API settings.
5. In Table Editor, edit content and toggle `is_published` to publish/hide it. New records default to hidden. The dashboard can manage content; browser users cannot create, edit, or delete it.

The frontend now reads these tables using the REST API. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `frontend/.env.local` (see `frontend/.env.example`), then restart Vite. Only the publishable key belongs in browser configuration. Without API configuration, the site uses its original local content. With API configuration, it shows loading/error states and respects empty results rather than restoring hidden records from local data. The visit planner continues saving plans locally; it does not create bookings in Supabase.

## Images and videos

Seed URLs use `/media/<filename>` and reference the existing files in `frontend/src/assets`. The frontend resolves these seeded paths to Vite’s bundled assets, so no copying is needed for the existing media. For new uploads, use Supabase Storage and set `image_url`, `video_url`, or `poster_url` to a public HTTPS URL. SQL does not upload files. Keep uploads restricted to administrators. Public media URLs remain accessible even if the associated database record is hidden.

## REST APIs

Use your project URL and **publishable** key. Do not use a secret key in React, browser requests, or committed files.

```sh
export SUPABASE_URL='https://YOUR_PROJECT_REF.supabase.co'
export SUPABASE_PUBLISHABLE_KEY='YOUR_PUBLISHABLE_KEY'

# Pick Your Staying Experience
curl "$SUPABASE_URL/rest/v1/staying_experiences?select=*&order=sort_order.asc,id.asc" \
  -H "apikey: $SUPABASE_PUBLISHABLE_KEY"

# One stay, using the existing frontend route ID
curl "$SUPABASE_URL/rest/v1/staying_experiences?id=eq.camping&select=*" \
  -H "apikey: $SUPABASE_PUBLISHABLE_KEY"

# Video gallery
curl "$SUPABASE_URL/rest/v1/video_gallery?select=*&order=sort_order.asc,id.asc" \
  -H "apikey: $SUPABASE_PUBLISHABLE_KEY"

# Published reviews, paginated
curl "$SUPABASE_URL/rest/v1/reviews?select=*&order=sort_order.asc,id.asc&limit=9&offset=0" \
  -H "apikey: $SUPABASE_PUBLISHABLE_KEY"
```

All responses are JSON arrays. An unpublished or unknown stay returns an empty array. A publishable key is sent in `apikey`; do not put it in an Authorization bearer header. Signed-in user requests can additionally send their Supabase Auth access token as a bearer token.

Frontend mapping:

- Stays: `image_url` → `image`, `price_unit` → `priceUnit`. Format numeric `price` with `Number(row.price).toLocaleString('en-IN')`. IDs match the current routes and package keys. Package details are in `package_title`, `accommodation`, and `inclusions`.
- Videos: `video_url` → `src`, `poster_url` → `poster`.
- Reviews: `name` and `text` already match the component. Use `source_url` for the Read More link. Existing reviews have `rating = null` because the source code does not record ratings. Seed content is copied from the site and has not been independently verified against Google.

## Access and verification

Public and signed-in clients can read only published rows. No client write grants or write policies are provided. This is a curated review API; public review submission is outside this setup and requires a moderated submission design.

After running the SQL, verify with the publishable key:

1. The three GET requests above return 4, 7, and 9 rows after seeding.
2. Hide a record in Table Editor and confirm it disappears from GET results, including ID-filtered queries.
3. Attempt POST, PATCH, and DELETE using the publishable key; all must be denied. Test against a disposable record. Repeat with a signed-in user access token if Auth is enabled.
4. Confirm media URLs load after publishing the assets.

Local generation checks confirm seed counts and IDs; database execution and live policy behavior still require these hosted checks.

If the secret key stored in the local `.txt` file was shared, committed, or exposed, rotate it in Supabase. The root `.gitignore` excludes that file to prevent accidental commits.

References: [Supabase REST API security](https://supabase.com/docs/guides/api/securing-your-api), [Row level security](https://supabase.com/docs/guides/database/postgres/row-level-security).
