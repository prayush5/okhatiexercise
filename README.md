# Awesome Authentication Project

A production-ready authentication app built with React and Material UI.

## 🔗 Live Demo
[https://okhatitesttask.netlify.app](https://okhatitesttask.netlify.app)

## ✨ Features
- User Registration with validation
- User Login with protected routes
- Persistent sessions using localStorage
- Responsive dark theme UI

## 🛠️ Tech Stack
- React
- Material UI v5
- React Router DOM v5
- localStorage for data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js v16
- Yarn

### Installation
Clone the repository:
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/okhatiexercise.git
cd okhatiexercise
\`\`\`

Install dependencies:
\`\`\`bash
yarn
\`\`\`

Run locally:
\`\`\`bash
yarn start
\`\`\`

Run tests:
\`\`\`bash
yarn test
\`\`\`

Build for production:
\`\`\`bash
yarn build
\`\`\`

## 🐳 Docker

Build the image:
\`\`\`bash
docker build -t okhatiexercise .
\`\`\`

Run the container:
\`\`\`bash
docker run -p 3000:3000 okhatiexercise
\`\`\`

Open browser at http://localhost:3000

## 📁 Project Structure
\`\`\`
src/
  components/
    ProtectedRoute.js
  pages/
    Register.js
    Login.js
    Dashboard.js
  utils/
    auth.js
  App.js
  index.js
  index.css
\`\`\`

## 📋 Exercises Completed
- ✅ Exercise 1 - Register form with validations
- ✅ Exercise 2 - Login with protected dashboard
- ✅ Exercise 3 - Deployed to Netlify
- ✅ Exercise 5 - Documentation updated
- ✅ Exercise 6 - Dockerized
