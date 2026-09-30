# Priyanka Learning Hub

Responsive coaching institute website for Class 9 and Class 10 Mathematics and Social Science students, with CBSE and ICSE support in Ahmadgarh, Punjab. Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, hand-written global CSS, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` and configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for Supabase features. The template also lists the public site, contact, and social variables. Keep `.env.local` untracked and never put secrets in `NEXT_PUBLIC_*` variables. Enquiry details are placed in a WhatsApp message only after a visitor submits the form; the website does not store them.

## Public routes

- `/`: Home, including a preview of up to three newest published resources linking to Notes Corner
- `/about`: Priyanka Singla profile and teaching approach
- `/classes`: Class 9 and Class 10 learning options
- `/notes`: Published-resource browsing with search, class, subject, and resource-type filters; private PDFs open through short-lived signed URLs
- `/learning`: Static YouTube lesson links, not database-backed
- `/results`: Results and feedback empty state
- `/gallery`: Eight owner-provided photos and an image lightbox
- `/contact`: Configured contact links and WhatsApp enquiry form

## Teacher Routes

- `/teacher/login`: Email/password sign-in for the teacher; public signup and OAuth are not available.
- `/teacher/dashboard`: Protected by Supabase authentication and redirects unauthenticated visitors to login. The teacher can create resources, validate and upload PDFs, edit metadata, publish/unpublish, and delete resources.
- PDF replacement is not implemented.

## Supabase

The app uses Supabase browser and server-side SSR clients with the public URL and publishable key from `.env.example`. The `public.resources` table and private `resources` Storage bucket support teacher resource management. Public Notes queries only published resources, and published PDFs are served using short-lived signed URLs. Draft resources are not exposed to public pages.

## Structure

- `app/`: public route entry points, metadata, and global styles.
- `components/layout/`: shared navigation, footer, page shell, and CTA.
- `components/home/`: homepage sections.
- `components/public/`: resource filters, WhatsApp enquiry form, and gallery interactions.
- `lib/config/`: centralized public site settings.
- `lib/data/`: content models, shared published-resource data access, and remaining static content.

Verified qualifications, experience, subjects, boards, delivery modes, locality, and contact/social links are configured. Results, testimonials, and batch timings remain unpublished. YouTube lesson links use neutral titles where no verified title was supplied.

## Scope

The public pages use the shared site shell and existing styling. The Results page currently shows an empty state, the Gallery displays owner-provided photos, and Free Learning uses static YouTube links. Resource creation, metadata editing, status changes, deletion, and published-resource display are implemented; replacing an existing PDF is not.
