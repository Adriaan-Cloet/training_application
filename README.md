# Triathlon Training App

Angular applicatie voor het plannen en bijhouden van Ironman 70.3 trainingen.
Doelrace: Knokke-Heist 2027.

## Stack

- Angular 21
- Tailwind CSS v4
- localStorage (later: ASP.NET Core + PostgreSQL)

## Setup

### Vereisten

- Node.js 24+
- Angular CLI 21+

### Installatie
```bash
git clone <repo-url>
cd triathlon-app
npm install
ng serve
```

Open `http://localhost:4200` in je browser.

## Folder structuur
```
src/app/
├── components/    # Herbruikbare UI-componenten
├── models/        # TypeScript interfaces
├── pages/         # Volledige views (gekoppeld aan routes)
└── services/      # Business logic & data
```

## Disciplines

Zwemmen, fietsen, lopen.
