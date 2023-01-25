import './App.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import React from 'react';

export default function App() {
  return (
    <div id="app">
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  )
}
