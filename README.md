# Portfolio Website - Shubham

A modern, interactive portfolio website built with React, featuring dark/light theme, 3D animations, and seamless user experience.

## ✨ Features

- 🎨 **Dark/Light Theme** - Toggle between beautiful light and dark modes
- 📧 **Contact Form** - EmailJS integration for contact messages and booking
- ☕ **Buy Me a Coffee** - Direct integration for support
- 🎯 **Interactive UI** - Smooth animations and transitions
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎭 **3D Animations** - Three.js powered visual effects
- ⚡ **Fast Performance** - Optimized with Vite
- 🧭 **Easy Navigation** - Intuitive dock and navbar

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd G
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure EmailJS (see EmailJS Setup section below)

5. Start the development server:
```bash
npm run dev
```

The app will be running at `http://localhost:5173/` (or next available port)

## 📧 EmailJS Setup

To enable contact form functionality:

1. Sign up at [EmailJS.com](https://www.emailjs.com/)

2. Create a new email service (Gmail, Outlook, etc.)

3. Create two email templates:
   - **Contact Template**: For contact messages
   - **Booking Template**: For meeting bookings

4. Copy your credentials to `.env` file:
```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_contact_template_id
VITE_EMAILJS_BOOKING_TEMPLATE_ID=your_booking_template_id
```

### EmailJS Template Variables

**Contact Template:**
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - Message content
- `{{to_name}}` - Your name

**Booking Template:**
- `{{from_name}}` - Booker's name
- `{{from_email}}` - Booker's email
- `{{date}}` - Booking date
- `{{time}}` - Booking time slot
- `{{to_name}}` - Your name

## ☕ Buy Me a Coffee Setup

Update the Buy Me a Coffee link in `/src/pages/Contact.jsx`:

```javascript
const handleCoffee = () => {
  window.open('https://www.buymeacoffee.com/YOUR_USERNAME', '_blank');
};
```

Replace `YOUR_USERNAME` with your Buy Me a Coffee username.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Icons**: Lucide React
- **Email**: EmailJS
- **Routing**: React Router DOM

## 📁 Project Structure

```
G/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and media
│   ├── components/     # React components
│   │   ├── 3d/        # Three.js components
│   │   ├── AI/        # AI-powered features
│   │   ├── Layout/    # Layout components (Navbar, Dock)
│   │   ├── UI/        # Reusable UI components
│   │   └── ...
│   ├── context/       # React Context (Theme)
│   ├── data/          # Portfolio data
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── App.jsx        # Main app component
│   ├── index.css      # Global styles
│   └── main.jsx       # Entry point
├── .env.example       # Environment variables template
├── package.json
└── vite.config.js
```

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Lint code with ESLint
```

## 🎨 Customization

### Update Personal Information

Edit `/src/data/portfolio.js` to update:
- Personal details (name, email, bio)
- Projects showcase
- Work experience
- Skills and achievements
- Social media links

### Theme Colors

Customize colors in `/src/index.css`:

```css
@theme {
  --color-primary: #007AFF;      /* Primary color */
  --color-secondary: #5E5CE6;    /* Secondary color */
  --color-accent: #FF2D55;       /* Accent color */
  /* ... */
}

.dark {
  --color-background: #0F172A;   /* Dark mode background */
  /* ... */
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build files will be in the `dist/` directory.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist/` folder to [Netlify](https://app.netlify.com/)

Or use Netlify CLI:
```bash
netlify deploy --prod
```

## 🔒 Environment Variables for Production

Make sure to set environment variables in your hosting platform:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Build & Deploy → Environment

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📞 Contact

For any questions or feedback, reach out through the contact form on the website or email directly at ubheshubham.37@gmail.com

---

Made with ❤️ using React and modern web technologies
