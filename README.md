# 🌱 BioNature India - 3D Animated Agricultural Website

> **Modern 3D animated website showcasing BioNature India's agricultural solutions with stunning visual effects and official branding**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.43.0-ff69b4.svg)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-7.3.6-646CFF.svg)](https://vitejs.dev/)

## ✨ Features

### 🎨 3D Visual Experience
- **Official BioNature Logo Integration** - Authentic branding throughout
- **3D Animated Loading Screen** - Floating particles with pulsing logo animation
- **Interactive 3D Hero Section** - Mouse-responsive transforms and parallax scrolling
- **Glassmorphism Dropdowns** - Modern 3D animated navigation menus
- **Product Cards with 3D Effects** - Hover animations with glow and particle effects
- **Smooth Page Transitions** - 3D transform-based route changes
- **Scroll-Based Animations** - Intersection observer reveals and floating elements

### 🚀 Technical Excellence
- **Performance Optimized** - 60fps animations with proper easing
- **Fully Responsive** - Works beautifully on all device sizes
- **TypeScript** - Full type safety and better developer experience
- **Modern React** - Hooks, suspense, and latest React patterns
- **Component Architecture** - Reusable, maintainable code structure

### 🌾 Agricultural Focus
- **Verified Company Data** - Real BioNature information and contact details
- **5 Authentic Products** - Phytocil, Energy Pro, Grow Mag, AgroMag, BioFert-G
- **Product Categories** - Bio Fertilizers, Micronutrients, Plant Growth Promoters
- **Agricultural Solutions** - Crop-specific guidance and problem solutions
- **Farmer-Centric Design** - Built for the agricultural community

## 🛠️ Technology Stack

### Core Framework
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.7.2** - Type-safe development
- **Vite 7.3.6** - Lightning-fast build tool

### 3D Animations & UI
- **Framer Motion 12.43.0** - Production-ready motion library
- **React Spring 10.1.2** - Spring-physics based animations
- **React Three Fiber 9.7.0** - React renderer for Three.js
- **React Three Drei 10.7.8** - Useful helpers for R3F

### Styling & Components
- **Tailwind CSS 3.4.15** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Beautiful & consistent icons
- **shadcn/ui** - Re-usable components built on Radix

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Wouter** - Minimalist React router

## 📁 Project Structure

```
artifacts/bionature-india/
├── public/
│   ├── bionature-logo.svg          # Official BioNature logo
│   └── favicon.svg                 # Site favicon
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AnimatedLoader.tsx  # 3D loading screen
│   │   │   └── PageTransition.tsx  # Page transition effects
│   │   ├── layout/
│   │   │   ├── Header.tsx          # 3D animated header
│   │   │   └── Footer.tsx          # Site footer
│   │   ├── products/
│   │   │   └── ProductCard.tsx     # 3D product cards
│   │   ├── sections/
│   │   │   └── Hero3D.tsx          # 3D hero section
│   │   └── ui/
│   │       └── animated-dropdown.tsx # 3D dropdown menus
│   ├── pages/
│   │   ├── Home.tsx               # Main homepage with animations
│   │   ├── Products.tsx           # Products catalog
│   │   └── [24 other pages...]    # Complete site structure
│   ├── data/
│   │   └── bionature-data.ts      # Verified company data
│   └── main.tsx                   # App entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** (recommended) or **npm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/bionature-india-3d-website.git
   cd bionature-india-3d-website
   ```

2. **Navigate to the project directory**
   ```bash
   cd artifacts/bionature-india
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the project
pnpm build

# Preview the production build
pnpm preview
```

## 🎯 Key Components

### 3D Hero Section (`Hero3D.tsx`)
- Mouse-responsive 3D text transforms
- Animated floating particles and geometric shapes
- Parallax background scrolling
- Interactive statistics cards
- Dynamic gradient overlays

### Animated Dropdown (`animated-dropdown.tsx`)
- Glassmorphism effects with backdrop blur
- Staggered item reveal animations
- 3D hover transforms
- Smooth entry/exit transitions

### Product Cards (`ProductCard.tsx`)
- Hover lift animations with glow effects
- Floating particle effects on interaction
- 3D image transforms and animated badges
- Interactive buttons with micro-animations

### Page Transitions (`PageTransition.tsx`)
- Smooth route change animations
- 3D transform effects
- Scroll-based reveal animations
- Intersection observer implementation

## 🌱 Company Information

**BioNature India** - Sustainable Agricultural Solutions
- **Phone:** +91 956 6753 333
- **Email:** hari@bionatureindia.com
- **Address:** Salem, Tamil Nadu, India
- **Mission:** Transforming nature's future through sustainable farming

### Products Portfolio
1. **Phytocil** - Bio Fertilizer
2. **Energy Pro** - Plant Growth Promoter  
3. **Grow Mag** - Micronutrient Supplement
4. **AgroMag** - Agricultural Magnesium
5. **BioFert-G** - Granular Bio Fertilizer

## 🎨 Animation Features

- **3D Transforms** - Perspective, rotations, and depth effects
- **Particle Systems** - Floating elements and interactive particles
- **Parallax Scrolling** - Depth-based movement on scroll
- **Hover Animations** - Interactive 3D hover states
- **Loading Animations** - Engaging preloader with company branding
- **Scroll Reveals** - Intersection observer-based animations
- **Smooth Transitions** - Seamless page and state changes

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Optimized** - Perfect tablet experience
- **Desktop Enhanced** - Full 3D effects on larger screens
- **Performance Focused** - 60fps animations across all devices

## 🔧 Development

### Code Quality
- **TypeScript** for type safety
- **ESLint** for code consistency
- **Component-based architecture**
- **Reusable animation hooks**
- **Proper error boundaries**

### Performance Optimization
- **Lazy loading** for images and components
- **Optimized animations** with `transform` and `opacity`
- **Minimal re-renders** with proper memoization
- **Efficient bundle splitting** with Vite

## 📄 License

This project is developed for BioNature India. All rights reserved.

## 🤝 Contributing

This project was developed specifically for BioNature India. For any modifications or enhancements, please contact the development team.

---

**Built with ❤️ for sustainable agriculture and modern web experiences**

🌾 **BioNature India** - Making crop cultivation easier through innovative agricultural solutions