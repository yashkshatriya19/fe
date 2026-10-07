import { useState } from 'react'
import './App.css'

function App() {
  const [count,setCount]=useState(0)
  const onClick=()=>{
    if(count<10){
    setCount(count+1)}
    else{
      alert('count is 10')
    }
  }
  return (
    <>
      <div>
        <button onClick={onClick}>Click</button>
        <p>Count:{count}</p>
      </div>
    </>
  )
}


export default App
