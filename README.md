# Priyanka Learning Hub

Responsive coaching institute website for Class 9 and Class 10 Mathematics and Social Science students, with CBSE and ICSE support in Ahmadgarh, Punjab. Built with Next.js App Router, React, TypeScript, Tailwind CSS v4, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

The ignored local `.env.local` contains the verified public contact/social details; the site URL and map URL remain unset. `.env.example` is a blank template. Enquiry details are placed in a WhatsApp message only after a visitor submits the form; the website does not store them. Do not place secrets in `NEXT_PUBLIC_*` variables.

## Public routes

- `/`: Home
- `/about`: Priyanka Singla profile and teaching approach
- `/classes`: Class 9 and Class 10 learning options
- `/notes`: Study-resource browsing and empty state
- `/learning`: Free-learning browsing and empty state
- `/results`: Verified results and feedback empty state
- `/gallery`: Gallery empty state, with category/lightbox support ready for real items
- `/contact`: Configured contact links and WhatsApp enquiry form

## Teacher access and Supabase

- `/teacher/login`: Teacher sign-in using email and password. Public signup and OAuth sign-in are not available.
- `/teacher/dashboard`: Protected dashboard placeholder. It requires an authenticated Supabase user and redirects unauthenticated visitors to the login page.
- Supabase browser and server-side SSR clients are implemented, with a dashboard-scoped Next.js proxy for session refresh. Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` using the placeholders in `.env.example`.
- The Supabase project has a `public.resources` table and a private `resources` Storage bucket. Application-side resource queries, management UI, and uploads have not been implemented yet.

## Structure

- `app/`: public route entry points, metadata, and global styles.
- `components/layout/`: shared navigation, footer, page shell, and CTA.
- `components/home/`: homepage sections.
- `components/public/`: resource filters, WhatsApp enquiry form, and gallery interactions.
- `lib/config/`: centralized public site settings.
- `lib/data/`: frontend content models and clearly marked placeholders.

Verified qualifications, experience, subjects, boards, delivery modes, locality, and contact/social links are configured. Results, testimonials, gallery content, batch timings, and notes remain intentionally unpublished. Video cards use neutral titles where no verified title was supplied.

## Scope

The public website routes listed above remain unchanged. Teacher email/password authentication and the protected dashboard are implemented separately from the public site. The database and Storage infrastructure exists in Supabase, but connecting the application to resource data and implementing resource management remain future work.
