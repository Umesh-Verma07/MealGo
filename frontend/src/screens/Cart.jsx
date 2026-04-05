import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div className='cart-shell'>
        <div className='empty-state m-2'>
          <h2 className='mb-2'>The cart is empty</h2>
          <p className='mb-0'>Add meals from the menu to see them here.</p>
        </div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch(`${SERVER_URL}/api/orderData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <>
      <div className='cart-shell'>
        <div className='table-responsive'>
        <table className='table table-hover align-middle'>
          <thead className='fs-5'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={`${food.id}-${food.size}-${index}`}>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                 <td ><button type="button" className="btn p-0 text-danger" aria-label={`Remove ${food.name}`}><Delete onClick={() => { dispatch({ type: "REMOVE", index }) }} /></button> </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className='cart-summary'>
          <div>
            <p className='mb-1 text-uppercase fw-semibold small text-secondary-emphasis'>Total price</p>
            <h2 className='fs-2'>₹{totalPrice}/-</h2>
          </div>
          <button className='btn btn-success px-4' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>
    </>
  )
}