# Giakaa Clone + CMS

A full-stack website clone of [Giakaa.com](https://www.giakaa.com/) — an AI-first IT services company — with a CMS admin panel for managing hero sliders and blog posts.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Image Storage**: Cloudinary (optional, with local fallback)

## 📁 Project Structure

```
giakaa-clone/
├── frontend/           # Next.js application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/# React components
│   │   └── lib/       # Utilities & API
│   └── public/        # Static assets
│
└── backend/           # Express.js API
    ├── models/        # Mongoose schemas
    ├── routes/        # API endpoints
    └── config/        # Database & Cloudinary
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Configure Environment

**Backend** (`backend/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/giakaa-clone
PORT=5000
FRONTEND_URL=http://localhost:3000

# Optional: Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

Open:
- **Website**: http://localhost:3000
- **Admin CMS**: http://localhost:3000/admin
- **API**: http://localhost:5000/api

## 📋 Features

### Frontend
- ✅ Responsive landing page (Hero, Stats, Services, Industries, Contact)
- ✅ Blog listing and detail pages with SEO
- ✅ Dynamic sitemap and robots.txt
- ✅ OpenGraph meta tags

### CMS Admin Panel
- ✅ Dashboard with quick actions
- ✅ Hero slide management (CRUD)
- ✅ Blog post management with Markdown
- ✅ Preview before publish
- ✅ Draft/Published status

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hero` | List hero slides |
| POST | `/api/hero` | Create slide |
| PUT | `/api/hero/:id` | Update slide |
| DELETE | `/api/hero/:id` | Delete slide |
| GET | `/api/blogs` | List blog posts |
| GET | `/api/blogs/:slug` | Get post by slug |
| POST | `/api/blogs` | Create post |
| PUT | `/api/blogs/:id` | Update post |
| DELETE | `/api/blogs/:id` | Delete post |

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
vercel deploy
```

### Backend (Render)
1. Create Web Service on Render
2. Connect GitHub repo
3. Set environment variables
4. Deploy

## 📸 Screenshots

- Homepage with animated hero slider
- Services and Industries grids
- Blog listing with cards
- Admin CMS dashboard
- Blog editor with Markdown support

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.
