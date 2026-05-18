import { useState, useEffect } from 'react'
import { market } from './serv/market'
import StockCard from './comp/stockCard.jsx'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app"></div>
  )
}