import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar(){
  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
    </nav>
  );
}
