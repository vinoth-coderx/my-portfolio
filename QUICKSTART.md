# 🚀 Quick Start Guide

## Installation Steps

### 1️⃣ Prerequisites
Make sure you have Node.js installed (v16 or higher)
Check with: `node --version`

### 2️⃣ Install Dependencies
Open terminal in the project folder and run:
```bash
npm install
```

### 3️⃣ Start Development Server
```bash
npm run dev
```

Your portfolio will open at: http://localhost:3000

## 📝 Customization

### Update Your Information
Open `src/App.tsx` and find the `portfolioData` object (around line 50)

Change these values:
- `name`: Your name
- `title`: Your job title
- `email`: Your email address
- `phone`: Your phone number
- `location`: Your location
- `bio`: Your biography
- `social`: Your social media links

### Update Skills
In the same file, update the `skills` array with your technologies and proficiency levels.

### Update Projects
Update the `projects` array with your own projects:
- `title`: Project name
- `description`: Project description
- `tech`: Array of technologies used
- `image`: Project image URL
- `demo`: Live demo link
- `github`: GitHub repository link

### Update Experience
Update the `experience` array with your work history.

## 🎨 Change Colors

To change from green to another color:

1. Open `tailwind.config.js`
2. Replace the `emerald` colors with your preferred color
3. Or search and replace `emerald` with another Tailwind color name in `src/App.tsx`

Available colors: blue, purple, pink, red, orange, yellow, green, teal, cyan, etc.

## 🌐 Deploy

### Option 1: Vercel (Recommended - Easiest)
1. Push code to GitHub
2. Go to vercel.com
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

### Option 2: Netlify
1. Build: `npm run build`
2. Drag the `dist` folder to netlify.com/drop

### Option 3: GitHub Pages
1. Install: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "npm run build && gh-pages -d dist"`
3. Run: `npm run deploy`

## 🆘 Troubleshooting

### Port already in use
If port 3000 is busy, the server will automatically use another port.

### Module not found errors
Run: `npm install` again

### Build errors
Delete `node_modules` and run `npm install` again

### Still having issues?
1. Make sure Node.js v16+ is installed
2. Delete `node_modules` folder
3. Delete `package-lock.json`
4. Run `npm install`
5. Run `npm run dev`

## 📞 Need Help?

Check the full README.md for detailed documentation!
