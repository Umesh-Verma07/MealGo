# MealGo 🍽️

A modern, fully responsive full-stack food-ordering app with a beautifully designed React/Vite frontend and a robust Node.js/Express/MongoDB backend.

---

## 🚀 Features

- **User Authentication**: JWT-based registration & login with secure password hashing
- **Dynamic Menu Discovery**: Browse food items and categories with powerful search
- **Smart Cart Management**: Add/update items with quantity, size variants, and real-time price calculation
- **Order Tracking**: View complete order history with dates and item breakdowns
- **Responsive Design**: Mobile-first UI that adapts seamlessly from phone to desktop
- **Modal Cart Display**: Non-blocking cart modal for quick checkout without page navigation
- **Beautiful Form Layouts**: Two-column auth cards with gradient overlays (collapsible on mobile)
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support

---

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose ODM
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- Express Validator (input validation)

**Frontend:**
- React 18 with Vite (blazing fast builds)
- Bootstrap 5 (responsive grid & components)
- React Router v7 (SPA navigation)
- React Bootstrap (pre-styled components)
- Material-UI Icons (navigation & actions)
- CSS Custom Properties (theming system)

**Development:**
- ESLint (code quality)
- Vite (module bundling)

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Umesh-Verma07/MealGo.git
cd MealGo
```

### 2. Setup the Backend
```bash
cd backend
npm install

# Configure environment variables
# Set your MongoDB URI in db.js or use env variables
# Default: mongodb://localhost:27017/mealgo

npm start
# Server runs on http://localhost:5001
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install

# Create .env.local (if needed for custom API endpoint)
# VITE_SERVER_URL=http://localhost:5001

npm run dev
# Development server: http://localhost:5173

# For production build:
npm run build  # Creates optimized dist/ folder
npm run preview  # Preview production build locally
```

### 4. Access the App
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5001](http://localhost:5001)

---

## 🎨 Design System

The UI uses a cohesive design language with CSS custom properties:

```css
--bg: cream background for the whole app
--primary: green (#1f7a56) for actions & highlights
--secondary: amber (#f59e0b) for accents
--radius-lg: 22px for most interactive elements
--shadow: elevation-based card shadows
```

### Key Layout Components
- **Hero Section**: Full-width carousel with overlay search
- **Menu Grid**: Auto-fit responsive card layout (230px min)
- **Auth Cards**: Two-column design (visual on left, form on right)
  - Collapses to single column on tablets
- **Order History**: Grouped by date with badge metadata
- **Cart Modal**: Fixed 88vh height with scrollable content

---

## 📦 Folder Structure
```
MealGo/
├── backend/
│   ├── db.js              # MongoDB connection
│   ├── index.js           # Express server entry
│   ├── models/
│   │   ├── User.js        # User schema
│   │   └── Order.js       # Order schema
│   └── Routes/
│       ├── User.js        # Auth endpoints
│       ├── OrderData.js   # Order endpoints
│       └── DisplayData.js # Menu endpoints
│
└── frontend/
    ├── src/
    │   ├── App.jsx        # Root router
    │   ├── App.css        # Global theme & layout
    │   ├── index.css      # Base resets
    │   ├── Model.jsx      # Reusable modal component
    │   ├── components/
    │   │   ├── Navbar.jsx      # Navigation & cart badge
    │   │   ├── Card.jsx        # Menu item card
    │   │   ├── ContextReducer.jsx  # Cart state management
    │   │   ├── Footer.jsx      # Site footer
    │   │   └── Footer.css
    │   └── screens/
    │       ├── Home.jsx        # Menu + hero + search
    │       ├── Cart.jsx        # Checkout table
    │       ├── Login.jsx       # Login form
    │       ├── Register.jsx    # Signup form
    │       └── MyOrder.jsx     # Order history
    │
    ├── public/
    │   ├── carousel/       # Hero carousel images
    │   └── card/          # Menu placeholder images
    │
    ├── package.json
    ├── vite.config.js
    └── index.html         # Root HTML (has cart-root portal)

---

## 📱 Responsive Breakpoints

The design adapts gracefully across devices:

| Breakpoint | Device | Layout Changes |
|-----------|--------|-----------------|
| < 576px   | Mobile | Single-column layout, stacked buttons, compact navbar |
| 576–768px | Tablet | Mobile menu active, auth cards stack vertically |
| 768–992px | iPad   | Larger cards, hero text adjusts, nav starts expanding |
| ≥ 992px   | Desktop | Full two-column auth, multi-column menus, sticky nav |

**Responsive Features:**
- Fluid typography (clamp for h1, h2, p tags)
- Auto-fit card grid (min 230px, max to viewport width)
- Touch-friendly buttons (44px+ tap targets)
- Readable text (18px+ on mobile, scales up)
- Optimized images (object-fit: cover on all card images)

---

## 🔧 API Endpoints

### Auth Routes (`/api`)
- `POST /register` – Create new user account
- `POST /login` – Authenticate and get JWT token

### Menu Routes (`/api`)
- `POST /foodData` – Fetch all categories and food items

### Order Routes (`/api`)
- `POST /orderData` – Place new order
- `POST /myOrderData` – Get user's order history

---

## 🚀 Performance

- **Vite bundling**: Sub-1s build times
- **CSS optimization**: Global theme + scoped component styles
- **Modal rendering**: React Portal (out of DOM tree, no layout thrashing)
- **Search debouncing**: Real-time filter with normalized strings
- **Image lazy loading**: Native browser support via Vite

---

## 🤝 Contributing

Found a bug or have a feature idea? Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

For major changes, please open an issue first to discuss what you'd like to change.

---

## 📝 License

This project is open source and available under the MIT License.

---

> Made with ❤️ for foodies everywhere. Happy ordering!
