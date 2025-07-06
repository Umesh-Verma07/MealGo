import './App.css'
import Home from './screens/Home.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import MyOrder from './screens/MyOrder.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
