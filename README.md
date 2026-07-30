# Hogwash Pressure Cleaning

Next.js website for Hogwash Pressure Cleaning.

Production: <https://hogwash-gilt.vercel.app>

## Quote email flow

The quote form posts JSON to `POST /api/quote`. The server validates the
submission and asks Resend to email it to:

`hogwashpressurecleaning@gmail.com`

Email is sent from:

`Hogwash Website <hogwash@send.mullinscreative.company>`

The visitor's email, when supplied, is set as `Reply-To`. Clicking Reply in
Gmail therefore replies to the visitor rather than the sending subdomain.

Required form fields are name, phone, service, and address. The form also has a
hidden honeypot field for basic bot filtering.

## Required Vercel environment variables

Configure these in the **hogwash** Vercel project for Production and Preview:

```text
RESEND_API_KEY
QUOTE_FROM_EMAIL
```

Recommended values:

```text
QUOTE_FROM_EMAIL=Hogwash Website <hogwash@send.mullinscreative.company>
QUOTE_RECIPIENT_EMAIL=hogwashpressurecleaning@gmail.com
```

`QUOTE_RECIPIENT_EMAIL` is optional because the same address is the safe
fallback in the server code. Never commit or paste the Resend API key into
source code, logs, screenshots, or support messages.

After changing a Vercel environment variable, create a new deployment. Existing
deployments retain the environment values with which they were built.

## Fast troubleshooting

Follow the message through each layer in order.

### 1. Check what the visitor saw

- **Success message:** Vercel reached Resend and Resend accepted the send
  request. This does not guarantee that Gmail ultimately placed it in Inbox.
- **Error message:** Check the Vercel function logs first.
- **Browser says a required field is missing:** Complete name, phone, service,
  and address.

### 2. Check Vercel runtime logs

From this linked project directory:

```powershell
vercel logs hogwash-gilt.vercel.app --since 1h --expand
```

Only quote-route failures:

```powershell
vercel logs hogwash-gilt.vercel.app --since 1h --query "Resend quote email failed" --expand
```

Common errors:

- `Email service is not configured`: one of the required Vercel variables is
  missing from the deployment's environment.
- Resend `401`: the API key is invalid, revoked, or belongs to the wrong team.
- Resend `403`: the From domain is unverified or the key lacks permission.
- Resend `429`: the account has reached a rate or plan limit.
- Vercel `502`: the route reached Resend, but Resend rejected the request. The
  expanded Vercel log contains the actual Resend reason.

### 3. Check Resend

Open the Resend **Emails** page and search for:

`hogwashpressurecleaning@gmail.com`

Then open the latest `New Hogwash quote request` message. Interpret the status:

- `delivered`: Gmail accepted the message. Check Inbox, Spam, Promotions, All
  Mail, filters, blocked senders, and search for `New Hogwash quote request`.
- `delivery_delayed`: the receiving server reported a temporary problem. Give
  Resend time to continue processing it and recheck the event timeline.
- `bounced`: open the bounce details. Correct the mailbox, content, or other
  stated problem before sending again.
- `suppressed`: the recipient previously hard-bounced or complained. Open the
  suppression details. Only remove the address from Resend's suppression list
  after fixing the cause and confirming the recipient wants the messages.
- `failed`: inspect the email event and its associated API log, fix the stated
  cause, and submit/send it again.
- No matching email: the request never reached Resend. Check Vercel logs and the
  browser's Network response for `/api/quote`.

Resend API request failures are also visible under **Logs**. Filter by the
Hogwash API key or by 4xx/5xx status codes.

## Recovering a quote that did not arrive

There is no application-side "stuck quote" queue in this version of the site.
Recovery depends on where the failure occurred:

1. If the email exists in Resend, open it to recover the name, phone, address,
   service, and notes.
2. Fix the delivery issue shown in its event details.
3. Re-send the information after the cause is fixed. A fresh form submission is
   safe; label any manual test clearly so it is not mistaken for a new lead.
4. If Resend shows `delivered`, do not repeatedly resend until Gmail Spam,
   filters, and All Mail have been checked.
5. If neither Resend nor Vercel contains the request, ask the visitor to submit
   again because the current site has no independent submission database.

For stronger no-lost-lead protection, add durable storage before sending email
and a verified Resend webhook for `delivered`, `delivery_delayed`, `bounced`,
`failed`, and `suppressed`. That would allow an admin queue and an explicit
Retry button. It is not implemented yet.

## Safe production test

Use the live form, or run:

```powershell
$body = @{
  name = "Website Test"
  phone = "555-555-0100"
  email = ""
  service = "Quote form connection test"
  area = "123 Test Street"
  notes = "Automated test. No response is needed."
  website = ""
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "https://hogwash-gilt.vercel.app/api/quote" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

Expected API response:

```json
{ "ok": true }
```

This response means Resend accepted the request. Confirm final delivery in the
Resend Emails dashboard.

## Local development

```powershell
npm install
npm run dev
```

For local email testing, create an ignored `.env.local` containing the required
environment variables. Do not commit that file.

Validate before deploying:

```powershell
npx tsc --noEmit
npm run build
```
