import React from 'react';
import './App.css';
import MainBody from './components/MainBody/MainBody';
import Profile from './components/ProfileSection/Profile';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <MainBody />
      <Profile />
    </div>
  );
}

export default App;
