import React from 'react';

export default function Checkout(){
  const handlePay = async () =>{
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const amount = Math.round(cart.reduce((s,i)=> s + i.price * i.qty, 0) * 100);
    const token = localStorage.getItem('token') || ''; // demo: user token if logged in
    const res = await fetch(`${import.meta.env.VITE_API_URL||'http://localhost:5000'}/api/orders/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
      body: JSON.stringify({ amount })
    });
    const data = await res.json();
    alert('Received clientSecret: ' + (data.clientSecret || data.message || JSON.stringify(data)));
  }

  return (
    <div className="container">
      <h2>Checkout</h2>
      <button onClick={handlePay}>Pay (demo)</button>
    </div>
  );
}
