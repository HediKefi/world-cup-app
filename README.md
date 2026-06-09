# World Cup 2026 App

A full-stack application for managing and viewing World Cup 2026 tournament data, including matches, teams, standings, and predictions.

## Tech Stack

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library

### Backend
- **Node.js** with **Express** - REST API server
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Features

### Public Features
- View upcoming and completed matches
- Browse team standings by group
- See match predictions and statistics
- Responsive design for all devices

### Admin Features
- Secure admin authentication
- Manage matches (create, update, delete)
- Update team statistics and standings
- View analytics dashboard
- Real-time data updates

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- pnpm (recommended) or npm

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file with your database credentials:**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/worldcup2026?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   PORT=3001
   NODE_ENV=development
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin
   ```

5. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

6. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

7. **Seed the database with initial data:**
   ```bash
   npm run seed
   ```

8. **Start the development server:**
   ```bash
   npm run dev
   ```

   The backend API will be running at `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **The `.env.local` file should contain:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

5. **Start the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   The frontend will be running at `http://localhost:3000`

## Usage

### Access the Application
- **Public Site:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
  - Username: `admin`
  - Password: `admin`

### API Endpoints

#### Authentication
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/verify` - Verify JWT token

#### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/:id` - Get single match
- `POST /api/matches` - Create match (requires auth)
- `PUT /api/matches/:id` - Update match (requires auth)
- `DELETE /api/matches/:id` - Delete match (requires auth)

#### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get single team
- `PUT /api/teams/:id` - Update team (requires auth)

#### Analytics
- `GET /api/analytics` - Get tournament analytics

#### Predictions
- `GET /api/predictions` - Get all predictions
- `GET /api/predictions/match/:matchId` - Get prediction for specific match
- `POST /api/predictions` - Create/update prediction

## Database Schema

### Models
- **User** - Admin users with authentication
- **Team** - National teams with statistics
- **Match** - Tournament matches with scores
- **Prediction** - Match outcome predictions

## Development

### Backend Development
```bash
cd backend
npm run dev          # Start dev server with hot reload
npm run build        # Compile TypeScript
npm run start        # Run production build
npm run prisma:studio # Open Prisma Studio (DB GUI)
```

### Frontend Development
```bash
cd frontend
pnpm dev            # Start Next.js dev server
pnpm build          # Build for production
pnpm start          # Run production build
pnpm lint           # Run ESLint
```

## Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Run migrations: `npm run prisma:migrate`
3. Build: `npm run build`
4. Start: `npm run start`

### Frontend Deployment
1. Set `NEXT_PUBLIC_API_URL` to your backend URL
2. Build: `pnpm build`
3. Deploy the `.next` folder to your hosting platform

## Project Structure

```
world-cup-app/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── src/
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Express middleware
│   │   ├── db.ts             # Prisma client
│   │   ├── index.ts          # Server entry point
│   │   └── seed.ts           # Database seeding
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── app/
    │   ├── admin/            # Admin pages
    │   ├── page.tsx          # Home page
    │   └── layout.tsx        # Root layout
    ├── components/           # React components
    ├── lib/
    │   ├── api.ts           # API client
    │   ├── data.ts          # Mock data
    │   └── storage.ts       # Data management
    ├── package.json
    └── next.config.mjs
```

## Security Notes

- Change default admin credentials in production
- Use strong JWT secret in production
- Enable HTTPS in production
- Set up CORS properly for production domains
- Use environment variables for sensitive data

## License

MIT License
