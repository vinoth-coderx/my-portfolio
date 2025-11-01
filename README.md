# 🚀 Professional Developer Portfolio

A modern, fully responsive portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion. Features a professional green and black color scheme with smooth animations and interactive elements.

![Portfolio Preview](https://via.placeholder.com/1200x600/000000/10b981?text=Portfolio+Preview)

## ✨ Features

- 🎨 **Modern Design** - Clean, professional green and black theme
- 📱 **Fully Responsive** - Works perfectly on all devices (mobile, tablet, desktop)
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 💻 **TypeScript** - Full type safety and better developer experience
- 🎯 **SEO Optimized** - Proper meta tags and semantic HTML
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🔧 **Easy to Customize** - Well-structured code and configuration

## 📋 Sections

- **Hero** - Eye-catching introduction with name, title, and social links
- **About** - Professional bio with contact information
- **Skills** - Interactive skills showcase with progress bars and categories
- **Projects** - Portfolio of featured projects with live demos and source code
- **Experience** - Professional timeline with achievements
- **Contact** - Contact form and detailed contact information

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **ESLint** - Code linting

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn or pnpm

### Step 1: Clone or Download

```bash
# If you have this as a Git repository
git clone <repository-url>
cd portfolio-project

# Or if you downloaded the folder, just navigate to it
cd portfolio-project
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using pnpm:
```bash
pnpm install
```

### Step 3: Start Development Server

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

Using pnpm:
```bash
pnpm dev
```

The application will open automatically at `http://localhost:3000`

## 🚀 Build for Production

To create an optimized production build:

Using npm:
```bash
npm run build
```

Using yarn:
```bash
yarn build
```

Using pnpm:
```bash
pnpm build
```

The build files will be in the `dist` folder.

## 👀 Preview Production Build

After building, you can preview the production build locally:

Using npm:
```bash
npm run preview
```

Using yarn:
```bash
yarn preview
```

Using pnpm:
```bash
pnpm preview
```

## 🎨 Customization

### Personal Information

Edit the `portfolioData` object in `src/App.tsx`:

```typescript
const portfolioData: PortfolioData = {
  personal: {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    // ... other fields
  },
  // ... rest of the data
};
```

### Colors

The color scheme uses emerald/green. To customize, edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      emerald: {
        // Customize your colors here
      },
    },
  },
},
```

### Add/Remove Sections

Simply comment out or remove the section components from `src/App.tsx`:

```typescript
return (
  <div>
    <Navbar activeSection={activeSection} />
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Contact />
    <Footer />
  </div>
);
```

## 📁 Project Structure

```
portfolio-project/
├── public/              # Static assets
├── src/
│   ├── App.tsx         # Main portfolio component
│   ├── main.tsx        # React entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── README.md           # Documentation
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to [Netlify](https://netlify.com)

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Alex Johnson**
- Website: [alexjohnson.dev](https://alexjohnson.dev)
- GitHub: [@alexjohnson](https://github.com/alexjohnson)
- LinkedIn: [Alex Johnson](https://linkedin.com/in/alexjohnson)

## 🙏 Acknowledgments

- Icons from system emojis
- Images from [Unsplash](https://unsplash.com)
- Built with love and ☕

## 💡 Tips

1. **Performance**: Images are loaded from external URLs. For better performance, download and optimize images locally.
2. **SEO**: Update meta tags in `index.html` with your information.
3. **Analytics**: Add Google Analytics or other tracking in `index.html`.
4. **Forms**: The contact form is client-side only. Integrate with a backend service like [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com/).

## 🐛 Known Issues

- Contact form doesn't actually send emails (needs backend integration)
- Social icons are placeholder SVGs

## 📮 Support

If you have any questions or need help, feel free to:
- Open an issue
- Contact me via email
- Connect on LinkedIn

---

Made with ❤️ and React
