import { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card({ foodItem, options }) {

    const dispatch = useDispatchCart()
    const cartData = useCart()
    const priceRef = useRef(null)

    const priceOptions = Object.keys(options)
    const defaultSize = priceOptions[0] || ""
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState(defaultSize)

    const handleAddToCart = async () => {
        const existingItem = cartData.find((item) => item.id === foodItem._id && item.size === size)

        if (existingItem) {
            await dispatch({ type: "UPDATE", id: foodItem._id, size, price: finalPrice, qty })
            return;
        }
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, img: foodItem.img, price: finalPrice, qty, size })
    }

    const finalPrice = size && options[size] ? qty * parseInt(options[size], 10) : 0;

    useEffect(() => {
        if (priceRef.current) {
            setSize(priceRef.current.value || defaultSize)
        }
    }, [defaultSize])

    return (
        <div className="card menu-card h-100">
            <img src={foodItem.img} className="card-img-top" alt={foodItem.name} />
            <div className="card-body">
                <h5 className="card-title">{foodItem.name}</h5>
                <div className="menu-card-controls">
                    <select className="form-select form-select-sm menu-card-select" value={qty} onChange={(e) => setQty(parseInt(e.target.value, 10))}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className="form-select form-select-sm menu-card-select" ref={priceRef} value={size} onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((op) => {
                            return <option key={op} value={op}>{op}</option>
                        })}
                    </select>
                    <div className="menu-card-price">
                        ₹{finalPrice}/-
                    </div>
                </div>
                <button className='btn btn-success mt-auto w-100' onClick={handleAddToCart} disabled={!size}>Add to Cart</button>
            </div>
        </div>
    )
}
