import React, { useEffect, useState } from 'react';
import { API } from '../api';
import ProductCard from '../components/ProductCard';

export default function Home(){
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    const fetchProducts = async () =>{
      const url = `${API}/products?search=${encodeURIComponent(search)}`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, [search]);

  return (
    <div className="container">
      <h2>Products</h2>
      <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
      <div className="grid" style={{marginTop:12}}>
        {products.map(p=> <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
