import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export default function Register() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" })

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch(`${SERVER_URL}/api/register`, {
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
                        <div className="auth-visual-pill">Create your account</div>
                        <h1>Join MealGo and order without friction.</h1>
                        <p>Set up your profile once, keep your delivery details handy, and checkout faster on every visit.</p>
                    </div>
                    <div className="auth-visual-list">
                        <div className="auth-visual-pill">One-minute signup</div>
                        <div className="auth-visual-pill">Personalized order history</div>
                        <div className="auth-visual-pill">Built for mobile first</div>
                    </div>
                </div>

                <div className="auth-form-wrap">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control form-control-lg" name='name' value={credentials.name} onChange={onChange} placeholder="Your full name" />
                        </div>
                        <div>
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control form-control-lg" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="you@example.com" />
                        </div>
                        <div>
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control form-control-lg" name='password' value={credentials.password} onChange={onChange} placeholder="Choose a strong password" />
                        </div>
                        <div>
                            <label htmlFor="location" className="form-label">Address</label>
                            <input type="text" className="form-control form-control-lg" name='location' value={credentials.location} onChange={onChange} placeholder="Delivery address" />
                        </div>
                        <div className="btn-row mt-2">
                            <button type="submit" className="btn btn-primary px-4">Create Account</button>
                            <Link to="/login" className="btn btn-outline-secondary px-4">Already a user</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}
