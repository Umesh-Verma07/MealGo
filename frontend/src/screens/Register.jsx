import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export default function Register() {

    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", location: "" })

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch(`${SEVER_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const json = await response.json()
        console.log(json)

        if (!json.success) {
            alert("Enter valid credentials");
        }
        if (json.success) {
            localStorage.setItem("userEmail", credentials.email)
            localStorage.setItem("authToken", json.authToken)
            navigate('/');
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <>
        <div><Navbar/></div>
        <div className="container row mt-5">
            <div className="col-8 offset-2">

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Address</label>
                    <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} />
                </div>
                <button type="submit" className="m-3 btn btn-primary">Submit</button>
                <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
            </form>
            </div>
        </div>
        <div><Footer/></div>
        </>
    )
}
