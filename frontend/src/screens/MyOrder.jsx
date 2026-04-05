import { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export default function MyOrder() {

    const [orderData, setOrderData] = useState(null)

    const fetchMyOrder = async () => {
        const response = await fetch(`${SERVER_URL}/api/myOrderData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        })

        const payload = await response.json()
        setOrderData(payload)
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    const orderGroups = orderData?.orderData?.order_data || []
    const hasOrders = orderGroups.length > 0

    return (
        <div>
            <Navbar />

            <div className='container order-shell'>
                <div className='order-header'>
                    <div>
                        <p className='menu-section-meta'>Account activity</p>
                        <h1>My Orders</h1>
                    </div>
                    <p className='menu-section-meta mb-0'>Track every meal you have already placed.</p>
                </div>

                {hasOrders ? orderGroups.slice().reverse().map((group, groupIndex) => {
                    // Each group stores one order date marker plus item objects.
                    const orderDate = group.find((entry) => entry.Order_date)?.Order_date || 'Order placed'
                    const items = group.filter((entry) => !entry.Order_date)

                    return (
                        <section key={`${orderDate}-${groupIndex}`} className='order-group'>
                            <div className='order-date'>{orderDate}</div>
                            <div className='order-grid'>
                                {items.map((arrayData, itemIndex) => (
                                    <article key={`${arrayData.name}-${itemIndex}`} className='card order-item-card h-100'>
                                        <img src={arrayData.img} className="card-img-top" alt={arrayData.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{arrayData.name}</h5>
                                            <div className='d-flex flex-wrap gap-2 align-items-center text-secondary-emphasis'>
                                                <span className='badge text-bg-light border'>Qty {arrayData.qty}</span>
                                                <span className='badge text-bg-light border'>{arrayData.size}</span>
                                                <span className='badge text-bg-light border'>₹{arrayData.price}/-</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )
                }) : (
                    <div className='order-empty'>
                        <h2 className='mb-2'>No order history yet</h2>
                        <p className='mb-0'>Once you place an order, it will appear here with the date and item breakdown.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}