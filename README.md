# MealGo 🍽️

A modern full-stack food-ordering web app with a React/Vite frontend and a Node.js/Express/MongoDB backend.

---

## 🚀 Features

- User registration & login (JWT-based authentication)
- Browse menu items and categories (MongoDB-powered)
- Add to cart with dynamic quantity, size, and price calculation
- Place orders and view order history
- Responsive, modern UI (Material-UI, Bootstrap)

---

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- bcryptjs (password hashing), jsonwebtoken (JWT)

**Frontend:**
- React (with Vite)
- Material-UI (MUI), Bootstrap 5
- Emotion (CSS-in-JS)

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Umesh-Verma07/MealGo.git
cd MealGo
```

### 2. Setup the Backend
```bash
cd backend
npm install
# Configure your MongoDB URI in db.js or as an environment variable
npm start
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5001](http://localhost:5001)

---

## 📦 Folder Structure
```
MealGo/
  backend/      # Express API, MongoDB models, routes
  frontend/     # React app (Vite), UI components, assets
```

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

> Made with ❤️ for foodies!
