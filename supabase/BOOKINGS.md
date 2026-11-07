# Bookings and Razorpay

Online checkout collects the **full package amount**, as requested. A booking is saved before calling Razorpay, so unpaid bookings and gateway setup failures are visible in `/admin` → **Bookings**. Payment success means money was captured; availability and booking confirmation remain separate admin actions. There is no automatic inventory reservation.

## 1. Create the database tables

In your existing Supabase project's SQL Editor, run the entire file:

`migrations/202611070003_bookings_payments.sql`

The content and admin migrations must already be applied. Run this migration once. The existing admin account keeps access through `public.admin_users`; you do not need another admin signup.

## 2. Configure server secrets

Get a **Test Mode** Key ID and Key Secret from your Razorpay dashboard. Choose a separate random webhook secret. In Supabase → Edge Functions → Secrets, set:

- `RAZORPAY_KEY_ID`: your `rzp_test_...` ID.
- `RAZORPAY_KEY_SECRET`: the corresponding secret.
- `RAZORPAY_WEBHOOK_SECRET`: the separate webhook secret you chose.
- `APP_ORIGINS`: comma-separated website origins, e.g. `http://localhost:5173,http://127.0.0.1:5173,https://yourdomain.com`. Use the actual local port and production domain, without trailing slashes.

Hosted Supabase functions automatically receive `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. The service-role key is used only on the server.

**Do not put Razorpay secrets or the service-role key in frontend `.env.local`, frontend source, or chat.** The frontend keeps its existing Supabase URL and publishable key. The checkout function returns the public Razorpay Key ID when needed.

## 3. Deploy through the dashboard

In Supabase → Edge Functions → Deploy a new function → Via Editor:

1. Create `booking-checkout` and paste the entire contents of `dashboard/booking-checkout.js` into the editor, replacing the sample code. Deploy it.
2. Create `razorpay-webhook` and paste the entire contents of `dashboard/razorpay-webhook.js`. Deploy it.
3. Disable **Verify JWT with legacy secret** for both functions. Guest checkout uses a private random booking token; the webhook verifies Razorpay's HMAC signature.

The standalone code can be pasted into the default `index.ts` editor entry. Backend code and secrets are managed in Supabase. The local dashboard files are backup copies; changes made in Supabase do not automatically update them.

## 4. Register the webhook in Razorpay

Use the same **Test Mode** as your configured keys. Add this webhook URL:

```text
https://tbwcgtemhglpdasdarja.supabase.co/functions/v1/razorpay-webhook
```

Use exactly the `RAZORPAY_WEBHOOK_SECRET` you configured in Supabase. Enable:

- `payment.captured`
- `payment.authorized`
- `payment.failed`
- `order.paid`
- `refund.processed`

Enable **automatic capture** in Razorpay. An authorized payment alone stays pending in this app. No manual capture request is issued by this code.

The webhook verifies the signature over the original body, fetches the current payment from Razorpay, and matches the stored order, full amount and INR currency. Duplicate and stale deliveries are safe: database updates lock the booking and cannot erase a refund or overwrite a captured payment with a failed attempt. A processing failure returns non-2xx for Razorpay to retry.

## 5. Test before switching to live keys

1. Restart Vite and open `/plan-your-visit`. Complete the guest form and choose **Book & pay full amount**.
2. Complete a payment using Razorpay's documented test payment methods, never real card details in Test Mode.
3. Open `/admin` → Bookings and refresh. Confirm the guest details, visit date, full amount, order ID, and `paid` status.
4. Check availability, set booking status to `confirmed`, add internal notes, and save.
5. Test closing checkout, a failed payment and a retry. The original booking reference is reused for an unchanged form; a second Razorpay order is not created on a repeated request.
6. Test a payment where the browser closes before verification. The webhook should still update the booking; customers can also use **Check payment status** in their original browser tab.
7. In Razorpay, issue a test refund. Its webhook should update the app to `partially_refunded` or `refunded`. Full refunds also cancel the booking.
8. Use a non-admin account and confirm it cannot read booking contact details, alter payment fields, or call the payment-update database function.

Once your Razorpay account is activated and Test Mode passes, replace server-side test keys with live keys and register the production webhook in Live Mode using the matching secret. Keep environments consistent. Existing Test Mode orders cannot be paid with Live Mode keys.

## Pricing and workflow

- The server reads the published stay's current price. A per-person package charges `guests × price`. A per-couple package charges `ceil(guests / 2) × price`; three guests pay for two couples. The form explains this rule.
- The form represents one overnight package. Multiple nights, children discounts, availability caps, date-specific rates and extra taxes are not modeled. Configure the advertised package rate accordingly before accepting payments.
- All amounts stored and sent to Razorpay are integer paise. The app collects 100%, not a 50% deposit.
- Prices and stay names are snapshotted on booking creation. Later content edits do not alter existing bookings.
- Bookings start `new`; only fully paid bookings can move to `confirmed` or `completed`. Admins can cancel a booking but cannot mark it paid manually.
- Cancelling a booking does not move money. Issue refunds in the Razorpay dashboard. Payment status updates arrive via the verified webhook.
- The admin list includes all attempts, newest first, with payment/booking filters, exact email search, pagination, contact details and internal notes. Refresh the list to see new bookings or webhook changes.
- A private 32-byte booking token permits verification/status checks without a customer signup. Only its SHA-256 hash is stored in the database. The browser retains the token in session storage to recover the attempt; keep the booking reference and contact the camp if the tab is lost. Public clients cannot query booking rows directly.
- If gateway order creation times out, the app leaves a `setup_failed` booking and does not blindly create another order on retry. Use the booking UUID (also the Razorpay receipt) to investigate in Razorpay before advising another payment. Never advise a customer to pay again solely because a browser error appeared.
- The anonymous checkout endpoint validates guest inputs and limits attempts per email. This is a basic abuse control, not bot protection; configure edge rate limits/CAPTCHA for public production traffic according to your traffic needs.

## API contract

`POST /functions/v1/booking-checkout` accepts JSON with `action: create | verify | status`.

Every action requires `booking_id` (UUID v4) and `booking_token` (64 lowercase hexadecimal characters). `create` also requires `name`, `email`, `phone`, `date` (`YYYY-MM-DD`, India calendar), `guests` (integer 1–100), `stay` (published stay ID), and optional `notes`. Client prices are ignored. `verify` additionally requires the three `razorpay_*` checkout callback fields. `status` fetches canonical payment information for the stored order. The response contains the reference, package summary, amount and payment/booking states, never guest contact details or the private token. No public booking-list endpoint exists.

`POST /functions/v1/razorpay-webhook` requires `x-razorpay-signature` and the original JSON event body. Unsupported authenticated events and unrelated orders are acknowledged and ignored. Invalid signatures are rejected.

## Local frontend checks

```sh
npm --prefix frontend run lint
npm --prefix frontend run build
node --test frontend/tests/adminContent.test.js
```

The backend previously passed local database and simulated-payment checks. The local backend test engine, mock server and CLI scaffolding were removed for the dashboard-only workflow. Validate deployed changes with the Razorpay Test Mode flow above. No live payment or hosted webhook delivery was verified during implementation.

Provider references: [Razorpay integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/), [payment lookup](https://razorpay.com/docs/api/payments/fetch-with-id/), [order payments](https://razorpay.com/docs/api/payments/fetch-payments-orders/), [webhook verification](https://razorpay.com/docs/webhooks/validate-test/), [Supabase function secrets](https://supabase.com/docs/guides/functions/secrets), [function deployment](https://supabase.com/docs/guides/functions/deploy).
