import React from 'react';
import './App.css';
import LayoutComponent from './components/LayoutComponent/LayoutComponent';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <LayoutComponent/>
    </BrowserRouter>
  );
}

export default App;