import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart(){
  const [cart, setCart] = React.useState(()=> JSON.parse(localStorage.getItem('cart')||'[]'));
  const navigate = useNavigate();
  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0);
  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length===0 ? <p>Cart empty <Link to='/'>Shop now</Link></p> : (
        <div>
          {cart.map(item=> (
            <div key={item._id}>{item.title} x {item.qty} = ₹{item.qty*item.price}</div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={()=> navigate('/checkout')}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}
