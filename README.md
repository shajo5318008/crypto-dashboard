# 📊 CryptoViz Dashboard

A modern, highly interactive web application designed for tracking cryptocurrency assets, visualizing market data, and managing a simulated portfolio. Built with React and Vite, it features a premium glassmorphism aesthetic and seamless data visualization.

## ✨ Key Features

- **Advanced Data Visualization**: Switch between Area, Line, Bar, and professional Candlestick charts for any asset using `recharts` and `anychart`.
- **Live Simulated Data**: Real-time mock data hook that simulates price fluctuations, trend sentiment, and portfolio value changes.
- **Dynamic Glassmorphism UI**: Beautiful, transparent, and responsive interface built with Tailwind CSS. Includes dynamic hover states and micro-animations.
- **Authentication Flow**: Mock user login session with persistent `localStorage` support.
- **Toast Notifications**: Integrated `react-hot-toast` for elegant user feedback on simulated "Buy" and "Sell" transactions.
- **Fully Responsive**: Carefully optimized layouts that adapt from ultra-wide monitors down to a dedicated mobile bottom-navigation app experience.
- **Customizable**: Light & dark mode support (defaults to dark theme).

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charting**: [Recharts](https://recharts.org/) & [AnyChart](https://www.anychart.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/shajo5318008/crypto-dashboard.git
   cd crypto-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View the application**:
   Open your browser and navigate to `http://localhost:5173`.

## 📁 Project Structure

```text
crypto-dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── dashboard/      # Main chart, asset lists, etc.
│   │   ├── layout/         # Sidebar, Topbar, Navigation
│   │   └── pages/          # Individual app pages (Portfolio, Markets, etc.)
│   ├── data/               # Mock data (CHART_DATA, NEWS, TRANSACTIONS)
│   ├── hooks/              # Custom React hooks (e.g., useSimulatedData)
│   ├── App.jsx             # Main application routing and state
│   ├── index.css           # Global Tailwind styles & Glassmorphism tokens
│   └── main.jsx            # React entry point
├── index.html              # HTML template
├── package.json            # Project metadata and dependencies
├── tailwind.config.js      # Tailwind configuration (if applicable)
└── vite.config.js          # Vite configuration
```

## 🎨 Design Philosophy

CryptoViz prioritizes a premium user experience. We stray away from generic plain colors, utilizing sleek dark modes, deep gradients, and interactive micro-animations. The "glass" design system makes heavy use of backdrop-blur overlays, soft transparent borders, and distinct color accents to differentiate bullish and bearish sentiments at a glance.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
