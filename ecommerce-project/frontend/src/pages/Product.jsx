import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../api';

export default function Product(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(()=>{
    const f = async ()=>{ const res = await fetch(`${API}/products/${id}`); setP(await res.json()); }
    f();
  },[id]);
  if(!p) return <div className="container">Loading...</div>;
  return (
    <div className="container">
      <h2>{p.title}</h2>
      <img src={p.image || 'https://via.placeholder.com/400'} alt={p.title} style={{width:300}}/>
      <p>{p.description}</p>
      <p>₹{p.price}</p>
      <button onClick={()=>{
        const cart = JSON.parse(localStorage.getItem('cart')||'[]');
        const exists = cart.find(i=> i._id===p._id);
        if(exists) exists.qty += 1; else cart.push({...p, qty:1});
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart');
      }}>Add to cart</button>
    </div>
  );
}
