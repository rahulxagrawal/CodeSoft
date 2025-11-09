import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectView from './pages/ProjectView';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

export default function App(){
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/project/:id' element={<ProjectView/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </div>
  );
}
