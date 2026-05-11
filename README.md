# Dragify - Professional Website Builder Foundation

A high-performance, scalable foundation for building a drag-and-drop website builder, inspired by Framer and Webflow.

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Validation**: [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
src/
 ├── app/             # Next.js App Router (Dashboard, Editor, API)
 ├── components/      # Reusable UI, Layout, and Builder components
 ├── features/        # Feature-based modules (Auth, Projects, Editor)
 ├── lib/             # Utility functions, Prisma client, Validations
 ├── store/           # Global state management (Redux)
 ├── providers/       # Context providers (Theme, Redux, Toast)
 └── types/           # Global TypeScript definitions
```

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js 18+ 
- PostgreSQL database

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```
Update `DATABASE_URL` with your PostgreSQL connection string.

### 4. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```

## 🏗️ Architecture Decisions

- **Route Groups**: Used `(dashboard)` and `(editor)` route groups to separate layouts and concerns without affecting the URL structure.
- **Zod Env Validation**: Ensures the application doesn't start without required environment variables, preventing runtime crashes.
- **Redux for Editor State**: The complex nested state of a drag-and-drop editor is best managed with Redux for performance and predictable updates.
- **Prisma Singleton**: Prevent exhaustion of database connections in development mode.
- **Modern UI**: Leveraging Shadcn UI with CSS variables for easy theming and premium aesthetics.

## 📝 License
MIT
