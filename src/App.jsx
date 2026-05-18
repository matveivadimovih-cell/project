import { useState, useEffect } from 'react'
import { market } from './serv/market'
import StockCard from './comp/stockCard.jsx'
import Dashboard from './comp/Dashboard.jsx'
import './App.css'

export default function App() {

  return (
    <div className="app">
      <Dashboard />
    </div>
  )
}