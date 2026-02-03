# Linklytics 🚀

Linklytics is a high-performance **Short Link Analytics Platform** designed for creators and businesses to track and optimize their social media traffic. 

![Linklytics Landing Page](public/screenshots/landing.png)

Built with **Next.js 15**, **Convex**, and **Clerk**, it provides real-time redirection and granular analytics without the overhead of traditional backend architectures.

## ✨ Key Features

- **🚀 Live Demo**: [Check out the live app here!](https://www.linklytics.app/)
- **🚀 Sub-second Redirection**: Catch-all dynamic routes ensure users reach their destination instantly.
- **📊 Real-time Analytics**: Built-in event tracking for clicks, unique visitors, and platform distribution.
- **📱 Device & Platform Detection**: Automatically identifies if traffic is coming from Instagram, YouTube, X, or Mobile/Desktop.
- **💳 Premium Tiering**: Integrated with **Razorpay** for subscription management (Free, Pro, Creator Plus).
- **🔒 Secure Auth**: robust user management powered by **Clerk**.
- **⚡ Serverless Backend**: Powered by **Convex** for real-time data sync and sub-100ms database queries.

![Linklytics Dashboard](public/screenshots/dashboard.png)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion
- **Backend/Database**: Convex (BaaS)
- **Authentication**: Clerk
- **Payments**: Razorpay
- **Charts**: Recharts
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Convex account
- A Clerk account
- A Razorpay account (for payments)

### 1. Clone the repository

```bash
git clone https://github.com/jyotirmya17/linklytics.git
cd linklytics/linklytics-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory (use `.env.example` as a template):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### 4. Run Development Server

```bash
# Terminal 1: Start Convex backend
npx convex dev

# Terminal 2: Start Next.js frontend
npm run dev
```

Open [https://www.linklytics.app/](https://www.linklytics.app/) to see the dashboard.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Jyotirmya](https://github.com/jyotirmya17)
