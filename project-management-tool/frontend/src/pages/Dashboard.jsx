import React, { useEffect, useState } from 'react';
import { API } from '../utils/api';

export default function Dashboard(){
  const [projects, setProjects] = useState([]);
  useEffect(()=>{ const f = async ()=>{ const res = await fetch(`${API}/projects`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')||''}` } }); setProjects(await res.json()); }; f(); }, []);
  return (
    <div className="container">
      <h2>Projects</h2>
      {projects.length===0 ? <p>No projects</p> : projects.map(p=> <div key={p._id} className="card">{p.title}</div>)}
    </div>
  );
}
