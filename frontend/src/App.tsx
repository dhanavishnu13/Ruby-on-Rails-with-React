import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Expenses from './features/expenses/Expenses';

function App() {
  return (
    <div className="App container">
     <Expenses />
    </div>
  );
}

export default App;
