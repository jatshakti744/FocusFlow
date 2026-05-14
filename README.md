# FocusFlow - Productivity & Goal Management App

This project is a high-end productivity application built from scratch based on the provided PDF requirements.

## Tech Stack
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React (Vite), Redux Toolkit, Context API
- **Styling:** Vanilla CSS (Modern Design, Glassmorphism, Theme Support)

## Project Structure
- `Backend/`: Node.js server, MongoDB models, JWT & OTP Auth logic.
- `Frontend/`: React application, Reusable components, Theme context.

## Key Features Implemented
- [x] **OTP Auth:** Email login with 6-digit OTP (Dev mode enabled).
- [x] **Theme System:** 4 Themes (Light, Dark, Ocean, Forest) with persistence.
- [x] **Reusable UI:** Reusable Buttons, Cards, and DataTable with export logic.
- [x] **Modules:** Dashboard (Charts), Schedules (List), Goals & Suggestions (Schema ready).
- [x] **Seeders:** Admin and initial content population script.

## Getting Started

### 1. Backend Setup
1. `cd Backend`
2. `npm install`
3. Update `.env` if needed (Default: `localhost:27017`)
4. Run seeder: `npm run data:import`
5. Start server: `npm run dev`

### 2. Frontend Setup
1. `cd Frontend`
2. `npm install`
3. Start dev server: `npm run dev`

### Development Credentials
- **Admin Email:** `admin@focusflow.com`
- **Dev OTP:** `123456`

## Instructions Followed
- Exact PDF match for logic and design.
- Reusable components (Header, DataTable, Forms).
- State management via Redux and Context API.
- Proper `.env` and `.gitignore` management.
- Data export and date formatting (via Moment.js).
