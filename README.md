# NUMEROLOGIE — Partner site

English and Japanese (`ja/`) site for wholesale partners and independent sales representatives. **Not** a consumer store and not a Shopify storefront.

Numerolog1e is a French designer brand from the South of France, founded in 2018, established in approximately 200 French retail doors. The public site is recruiting independent US sales representatives for **FW2027**. **SS2027 is a brand-reference collection. New wholesale orders for SS2027 are closed.**

Designed in the South of France. Cédric Chaudet leads creative direction. Eric Sheng leads business and operations. Inquiries: ericsheng1011@gmail.com.

GitHub Pages publishes this repository from `main` to https://numerolog1e.net/.

## Open locally

```bash
cd /workspace/partner-site
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/`.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | FW2027 recruitment, SS2027 as reference, proof points |
| `brand.html` | Cédric Chaudet, numbered shirts, French retailers, international development |
| `mens.html` | SS2027 archive positioning and FW2027 as the next selling season |
| `lookbook.html` | SS2027 photography, labeled collection archive; no SS2027 ordering |
| `wholesale.html` | Sales representatives and retail buyers, pricing, territory, ordering |
| `contact.html` | Direct partner inquiry form |
| `ja/` | Japanese mirrors of the same pages |

## Partner inquiry form

`contact.html` and `ja/contact.html` post to [Web3Forms](https://api.web3forms.com/submit) from the browser. GitHub Pages does not run a server, so this is the delivery path.

The form checks required fields (inquiry type, full name, business email, company, territory or store location, message, privacy consent), ignores a filled honeypot (`botcheck`), and waits two seconds before it will submit. A confirmation, or a clear failure, stays on the page.

**Submissions do not email anyone until an access key is saved.** With the placeholder key, the form validates and then tells the visitor to email ericsheng1011@gmail.com. It does not show a success message.

### Connect the form to ericsheng1011@gmail.com

1. Open [https://web3forms.com](https://web3forms.com) and enter `ericsheng1011@gmail.com`. Use that address. Web3Forms sends every submission to the inbox that created the key. The form cannot choose a different recipient.
2. Open the email Web3Forms sends and copy the access key.
3. In `js/form-config.js`, replace `YOUR_WEB3FORMS_ACCESS_KEY` with that key. The same placeholder in `contact.html` and `ja/contact.html` (the hidden `access_key` field) must be replaced with the same key, so a no-JavaScript submit still has it. The key is public by design on a static site. It only delivers mail to the inbox that created it.
4. In the Web3Forms dashboard, allow the domains `numerolog1e.net` and `www.numerolog1e.net`. Add `localhost` only if you test on your own machine.
5. Commit and push to `main`. GitHub Pages rebuilds https://numerolog1e.net/ from that branch.
6. Send a test from https://numerolog1e.net/contact.html on a computer and a phone. Confirm the message arrives at `ericsheng1011@gmail.com` with inquiry type, company, and territory. Then submit once with a required field empty and confirm the page shows an error and does not say the inquiry was sent.

`?inquiry=rep` and `?inquiry=retail` pre-select the inquiry type. Japanese pages set the hidden language field to Japanese.

Do not publish a base wholesale price, a commission percentage added on top of wholesale, a universal deposit split, a fixed lead time, or a claim that US domestic fulfillment is already running. Those terms are confirmed per collection with qualified partners.
