import React, { useState } from 'react'
import './App.css'

function App() {
  const [color,setColor] = useState('white')
  const changeColor = (e:React.MouseEvent<HTMLButtonElement>) => {
    setColor(e.currentTarget.value)
    console.log(color);
    
  }
  return (
    <>
      <body style={{backgroundColor:color}}>
        <button type="button" onClick={changeColor} value="Green">Green</button>
        <button type="button" onClick={changeColor} value="Blue">Blue</button>
        <button type="button" onClick={changeColor} value="Red">Red</button>
        <button type="button" onClick={changeColor} value="Yellow">Yellow</button>
        <button type="button" onClick={changeColor} value="Pink">Pink</button>
      </body>
    </>
  )
}

export default App
