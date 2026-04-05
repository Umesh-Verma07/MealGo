import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export default function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch(`${SERVER_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const json = await response.json()

    if (!response.ok || !json.success) {
      alert("Enter valid credentials");
      return;
    }

    localStorage.setItem("userEmail", credentials.email)
    localStorage.setItem("authToken", json.authToken)
    navigate('/');
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <>
    <Navbar/>
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-visual">
          <div>
            <div className="auth-visual-pill">Welcome back</div>
            <h1>Log in to continue your MealGo experience.</h1>
            <p>Pick up your cart, track existing orders, and get back to your favorite dishes faster.</p>
          </div>
          <div className="auth-visual-list">
            <div className="auth-visual-pill">Fast checkout</div>
            <div className="auth-visual-pill">Saved order history</div>
            <div className="auth-visual-pill">Responsive on every device</div>
          </div>
        </div>

        <div className="auth-form-wrap">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control form-control-lg" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control form-control-lg" name='password' value={credentials.password} onChange={onChange} placeholder="Enter your password" />
            </div>
            <div className="btn-row mt-2">
              <button type="submit" className="btn btn-primary px-4">Log In</button>
              <Link to="/register" className="btn btn-outline-secondary px-4">Create Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
