import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../utils/api';

export default function ProjectView(){
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  useEffect(()=>{ const f = async ()=>{ const res = await fetch(`${API}/projects/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')||''}` } }); setProject(await res.json()); const t = await fetch(`${API}/tasks/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')||''}` } }); setTasks(await t.json()); }; f(); }, [id]);
  if(!project) return <div className="container">Loading...</div>;
  return (
    <div className="container">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <h3>Tasks</h3>
      {tasks.map(t=> <div key={t._id} className="card">{t.title} - {t.status}</div>)}
    </div>
  );
}
