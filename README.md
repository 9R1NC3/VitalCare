# Virus Quarantine & Treatment Facility

Full-stack role-based patient management app built with Next.js (App Router), Tailwind CSS, and Firebase Firestore.

## Tech Stack

- Frontend: Next.js 16 + React 19 + Tailwind CSS 4
- Backend: Firebase Firestore (via Firebase Admin SDK on server)
- Hosting: Vercel

## User Roles

- Nurse
- Doctor
- Admin

## Patient Model

Each patient document stores:

- `id`
- `name`
- `roomNumber`
- `temperatureLogs`: `{ date, temperature }[]`
- `feverFreeStreak`
- `status`: `ADMITTED | TEMP_PENDING | READY_FOR_DOCTOR | UNDER_REVIEW | READY_FOR_DISCHARGE | DISCHARGED`
- `doctorVisitedToday`

## Business Rules Enforced

- Nurse can log temperature once per patient per day.
- If temperature `< 99F`, `feverFreeStreak` increments; otherwise resets to `0`.
- If `feverFreeStreak >= 3`, status becomes `READY_FOR_DISCHARGE`.
- Doctor can mark visit only after today's temperature exists.
- Discharge only allowed when patient is `READY_FOR_DISCHARGE`.
- Max occupancy capped at `74` patients.

## Dashboards

- `/nurse`: patients needing temperature logging
- `/doctor`: patients ready for doctor visit today
- `/admin`: occupancy KPIs, admit patient form, discharge-ready list

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy env template and fill in Firebase values:

```bash
cp .env.example .env.local
```

3. Run development server:

```bash
npm run dev
```

4. Optional one-time sample seed (if `patients` collection is empty):

```bash
curl -X POST http://localhost:3000/api/patients/seed
```

## Firebase Configuration

Create a Firebase project and Firestore database. Use a Service Account and populate:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Optional client config values are also listed in `.env.example`.

## API Endpoints

- `GET /api/patients` -> list patients
- `POST /api/patients/seed` -> insert sample patients (one time)

## Project Structure

- `src/app` - pages, route handlers, server actions
- `src/components` - reusable UI blocks/forms
- `src/lib` - Firebase setup, domain types, constants, Firestore logic

## Deploy to Vercel

1. Push project to GitHub.
2. Import in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.
