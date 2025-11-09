import React, { useState } from 'react';
import { API } from '../utils/api';
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit = async (e)=>{ e.preventDefault(); const res = await fetch(`${API}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password}) }); const data = await res.json(); if(data.token){ localStorage.setItem('token', data.token); alert('Logged in'); } else alert(data.message||'Error'); };
  return (<div className="container"><h2>Login</h2><form onSubmit={submit}><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><br/><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/><button>Login</button></form></div>);
}
