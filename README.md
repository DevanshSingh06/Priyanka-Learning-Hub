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

## Structure

- `app/`: public route entry points, metadata, and global styles.
- `components/layout/`: shared navigation, footer, page shell, and CTA.
- `components/home/`: homepage sections.
- `components/public/`: resource filters, WhatsApp enquiry form, and gallery interactions.
- `lib/config/`: centralized public site settings.
- `lib/data/`: frontend content models and clearly marked placeholders.

Verified qualifications, experience, subjects, boards, delivery modes, locality, and contact/social links are configured. Results, testimonials, gallery content, batch timings, and notes remain intentionally unpublished. Video cards use neutral titles where no verified title was supplied.

## Scope

This stage contains public frontend pages only. Supabase, authentication, admin tools, database/storage, and enquiry delivery are intentionally not implemented.
