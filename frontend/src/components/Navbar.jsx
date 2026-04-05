import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Cart from '../screens/Cart'
import Model from '../Model'
import { useCart } from './ContextReducer'

export default function Navbar() {
    const navigate = useNavigate();

    const data = useCart();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        setCartView(false);
        navigate("/");
    }

    const [cartView, setCartView] = useState(false)
    const isAuthenticated = Boolean(localStorage.getItem("authToken"))
    const cartCount = data.length

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark site-navbar sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fw-bold fst-italic d-flex align-items-center" to="/">
                        <span>MealGo</span>
                        <span className="d-none d-sm-inline">Fresh food, fast delivery</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
                            <li className="nav-item">
                                <Link className="nav-link active fw-semibold" aria-current="page" to="/">Home</Link>
                            </li>
                            {isAuthenticated ?
                                <li className="nav-item">
                                    <Link className="nav-link active fw-semibold" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                                : null}
                        </ul>

                        {!isAuthenticated
                            ?
                            <div className='nav-actions'>
                                <Link className="btn btn-light text-success fw-semibold px-3" to="/login">Login</Link>
                                <Link className="btn btn-outline-light fw-semibold px-3" to="/register">Register</Link>
                            </div>
                            :
                            <div className='nav-actions'>
                                <button type="button" className="btn btn-light text-success fw-semibold px-3 cart-badge" onClick={()=> {setCartView(true)}}>
                                    My Cart {" "}
                                    <Badge pill bg="danger">{cartCount}</Badge>
                                </button>
                                {cartView ? <Model onClose={()=> setCartView(false)}><Cart/></Model> : null}
                                <button type="button" className="btn btn-outline-light fw-semibold px-3" onClick={handleLogout}>Logout</button>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
