# NSS SETU — Official NSS Volunteer Recruitment Portal

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Turso](https://img.shields.io/badge/Turso-LibSQL_SQLite-00E699?style=flat&logo=sqlite)](https://turso.tech/)
[![License](https://img.shields.io/badge/License-Institutional-forest)](LICENSE)

> **"Be the Change. Serve the Nation."**  
> Official recruitment campaign website for the **National Service Scheme (NSS)** unit at **Vignan's Institute of Information Technology (VIIT, Autonomous)** in collaboration with **Mera Yuva Bharat (MY BHARAT)**.

---

## 🏛️ Creative Concept: Three Identities • One Mission

**NSS SETU** (*Setu = The Sacred Bridge*) connects academic excellence, community service, and nationwide youth empowerment into a unified civic movement:

1. **VIIT (Host College)** — Vignan's Institute of Information Technology (Autonomous • NAAC 'A+' Accredited).
2. **NSS (Core Movement)** — National Service Scheme under the Ministry of Youth Affairs and Sports, Government of India (*"Not Me But You"*).
3. **MY BHARAT (National Platform)** — Mera Yuva Bharat, channeling youth energy (*Yuva Shakti*) for Viksit Bharat 2047.

---

## ✨ Key Features

- **Full-Screen Cinematic Intro Sequence**:
  - Features the official **Konark Sun Wheel** emblem with counter-rotating golden spoke halos.
  - Sacred Devnagari script (*"राष्ट्रीय सेवा योजना"*) and gold motto badge (*"NOT ME BUT YOU"*).
  - Smooth scale-and-blur entrance transition into the main campaign portal with an accessible *Skip Intro ↗* control.

- **Dual-Tier Institutional Navigation**:
  - **Tier 1 (National Ribbon)**: Government of India & Ministry of Youth Affairs affiliation with Indian tricolor badge and live recruitment indicator (`● NSS RECRUITMENT 2026`).
  - **Tier 2 (Main Navbar)**: Sculpted triple-emblem brand seal (VIIT / NSS / MY BHARAT) with smooth navigation links and rapid-action CTA.

- **Interactive 3D "SETU Triad of Service" Centerpiece**:
  - Architectural 3D monument rendered with cursor parallax tilt (`perspective: 1200px`) and dynamic specular lighting.
  - Animated glowing SVG bridge energy conduits flowing between VIIT, NSS, and MY BHARAT.
  - Interactive deep inspection cards detailing each partner organization's civic role.

- **Two-Step Accessible Registration Flow**:
  - **Step 1**: Student Identity & Academic Details (Name, Roll Number, Email, Phone, UG/PG, Department, Year, Section).
  - **Step 2**: Volunteer Preferences (Areas of Interest, Prior Experience, Motivation, Informed Consent).
  - Preserves entered data across back-and-forth step transitions.
  - Server-side and client-side Zod schema validation with robust SQLite duplicate constraint checking (`409 Conflict`).

- **Coordinator Administration Portal (`/admin`)**:
  - Protected with session cookie authentication (`ADMIN_PASSWORD`).
  - Live applicant search and real-time department and academic year filtering.
  - One-click RFC 4180 compliant CSV export for recruitment review committees.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.4 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (Custom Institutional Palette: Forest Green `#1A3C29`, Warm Ivory `#F6F3EA`, Champagne Gold `#C6A66B`, Charcoal `#282B29`)
- **Animations**: Framer Motion
- **Database**: Turso (LibSQL / Distributed SQLite)
- **Icons**: Lucide React
- **Validation**: Zod + React Hook Form

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rohithsaimerupula/Nss-volunteers-registration-portal.git
cd Nss-volunteers-registration-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Turso Database Credentials
TURSO_DATABASE_URL="libsql://your-database-name.turso.io"
TURSO_AUTH_TOKEN="your-turso-auth-token"

# Admin Portal Password
ADMIN_PASSWORD="your-secure-admin-password"
```

*(Note: When Turso credentials are not supplied, the app automatically runs in local development mode).*

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Deployment

### Build Locally
```bash
npm run build
npm run start
```

### Deploying to Vercel
1. Link your repository in [Vercel](https://vercel.com).
2. Set Framework Preset to **Next.js**.
3. Set Root Directory to `./`.
4. In **Project Settings > Environment Variables**, add:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `ADMIN_PASSWORD`
5. Click **Deploy**.

---

## 🛡️ Administration Portal

- **URL**: `/admin`
- **Default Development Passcode**: Configured via `ADMIN_PASSWORD` in `.env.local`

---

## 📜 Attribution & Institutional Rights

- **National Service Scheme (NSS)** — Ministry of Youth Affairs and Sports, Government of India.
- **Vignan's Institute of Information Technology (VIIT)** — Visakhapatnam, Andhra Pradesh.
- **Mera Yuva Bharat (MY BHARAT)** — Government of India.
