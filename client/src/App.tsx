import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section>
        <h1>Dashboard</h1>
        <p>Total Revenue: $12345</p>
        <p>Total Orders: 678</p>
        <p>Average Ticket: $18.20</p>
      
      <div className="date-inputs">
        <input
          type="date"
          placeholder="Start Date"
        />
        <input
          type="date"
          placeholder="End Date"
        />
        </div>
      </section>
    </>
  )
}

export default App
