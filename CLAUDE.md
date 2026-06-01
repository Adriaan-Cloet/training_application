# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

The app lives in `triathlon-app/`. All commands must be run from that directory.

## Commands

```bash
cd triathlon-app

npm start          # dev server at http://localhost:4200
npm run build      # production build → dist/
npm test           # run all Vitest unit tests
ng generate component components/my-component   # scaffold a component
```

To run a single test file:
```bash
npx vitest run src/app/services/training.service.spec.ts
```

## Architecture

Angular 21 standalone components app (no NgModules). Backend is Supabase (auth + Postgres). Styled with Tailwind CSS v4. Charts via Chart.js + ng2-charts. It's a PWA via `@angular/service-worker`.

**The entire app is in Dutch** — variable names, route paths, UI labels, and Supabase column names are all Dutch.

### Services (state layer)

Services own all Supabase calls and expose state via Angular signals:

- `SupabaseService` — thin wrapper that creates and exposes the Supabase client using `environment.ts` credentials
- `TrainingService` — CRUD against the `trainingen` table; exposes a readonly `trainings()` signal
- `SettingsService` — upserts to `user_settings`; exposes a readonly `settings()` signal
- `AuthService` — wraps Supabase auth (signIn, signUp, signOut, updatePassword, deleteAccount via RPC `delete_user_account`)

Pages call `loadAll()` / `load()` in `ngOnInit` — there is no global app-level data loading.

### Routing

All routes except `/auth` are guarded by `authGuard` (functional guard that checks `supabase.auth.getSession()`).

| Path | Component |
|------|-----------|
| `/` | HomeComponent |
| `/log` | LogPage |
| `/training/:id` | TrainingDetailComponent |
| `/calendar` | CalendarComponent |
| `/stats` | StatsComponent |
| `/instellingen` | Settings |
| `/auth` | Auth |

Bottom nav is hidden on `/auth`, `/training/:id`, and `/log` — controlled by a signal in `App`.

### Data models

**Training** (`src/app/models/training.model.ts`):
- `Discipline` enum: `zwemmen`, `fietsen`, `lopen`, `krachttraining`
- Fields: `id` (UUID string), `title`, `date` (ISO string), `startTime?`, `discipline`, `duration` (minutes), `distance?`, `feeling?`, `notes?`
- DB column mapping: `startTime` ↔ `start_time`, `userId` ↔ `user_id`

**RaceSettings** (`src/app/models/race-settings.model.ts`):
- Fields: `raceName`, `raceDate`, `countdownEnabled`, `trainingStartDate`
- DB column mapping: snake_case equivalents in `user_settings` table

### Components

- `BottomNavComponent` — persistent bottom navigation
- `PageHeaderComponent` — shared page title/back-button header
- `TrainingListComponent` — renders a list of trainings
- `TrainingFormComponent` — add/edit training form
- `RaceCountdownComponent` — countdown to race date shown on home
- `FlattenPipe` — flattens `(number | null)[][]` to `(number | null)[]` for calendar week rendering

### Supabase tables

- `trainingen` — training sessions, filtered per `user_id`
- `user_settings` — one row per user, upserted on save

## Git

Never create commits without being explicitly asked by the user.

## Testing

Tests use Vitest. Each file is colocated with its source (e.g. `training.service.spec.ts` next to `training.service.ts`). The test runner is configured through the Angular build system (`ng test`).
