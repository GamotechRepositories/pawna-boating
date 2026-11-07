# Dashboard-only deployment

These standalone copies contain all shared application code. Your deployed backend can be managed entirely in Supabase; there is no CLI deployment requirement.

1. Run the bookings migration in SQL Editor if you have not already run it.
2. In Supabase → Edge Functions, choose Deploy a new function → Via Editor.
3. Name the first function exactly `booking-checkout`. Replace the sample editor code with the entire contents of `booking-checkout.js` from this folder, then deploy. The code is also valid JavaScript syntax inside the default `index.ts` editor entry.
4. Create a second function named exactly `razorpay-webhook` and paste the entire contents of `razorpay-webhook.js`, then deploy it.
5. For both functions, disable **Verify JWT with legacy secret** in the function settings. Guest booking requests use private booking tokens; webhook requests use signature verification in the code.
6. In Edge Functions → Secrets, set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` and `APP_ORIGINS`. Supabase automatically supplies its own URL and service-role key. Keep the actual secrets in Supabase.
7. Register the deployed webhook URL and run a Razorpay Test Mode booking as described in `../BOOKINGS.md`.

These files are preparation copies; creating them locally does not deploy them. Both function names must match exactly because the frontend calls `booking-checkout` and Razorpay sends to `razorpay-webhook`.

Edit and deploy the backend in Supabase. Keep these standalone copies as backups; dashboard changes do not automatically update these files.
