import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const[length, setLength] = useState(8);
  const[password, setPassword] = useState("");
  const[charAllowed, setCharAllowed] = useState(true);
  const[numAllowed, setNumAllowed] = useState(true);
  const[passwordStrength, setPasswordStrength] = useState("Very Poor");
  const generatePassword = useCallback(() => {
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed){
      string += "0123456789";
    }
    if(charAllowed){
      string += "!@#$%^&*()_+-=[]{}|;':,./<>?";
    }
    for(let i = 0; i < length; i++){
      password += string[Math.floor(Math.random() * string.length)];
    }
    setPassword(password)   ;
  }, [length, charAllowed, numAllowed, setPassword]);

useEffect(() => {
  generatePassword();
},[length, charAllowed, numAllowed, generatePassword]);

const copy = useCallback(() => {
  window.navigator.clipboard.writeText(password);
},[password]);

useEffect(() => {
  let score = 0;
  if(password.length >= 2) score++;
  if(password.length >= 4) score++;
  if(password.length >= 8) score++;
  if(password.length >= 12) score++;
  if(password.length >= 16) score++;
  if(password.length >= 20) score++;
  if (/[A-Z]/.test(password) && password.length > 4) score+=2;
  if (/[0-9]/.test(password) && password.length > 4) score+=2;
  if (/[^A-Za-z0-9]/.test(password) && password.length > 4) score+=2;
  console.log("score:",score);
  
  if(score <= 2) {
    setPasswordStrength("Very Poor");
  }
  else if (score <= 4) {
    setPasswordStrength("Poor");
  } else if (score <= 6) {
    setPasswordStrength("Fair");
  } else if (score <= 8) {
    setPasswordStrength("Good");
  } else if (score <= 10) {
    setPasswordStrength("Strong");
  }
  else {
    setPasswordStrength("Excellent");
  }
}, [password,length, charAllowed, numAllowed]);

const passwordRef = useRef<HTMLInputElement>(null);
  return (
    // <>
    //   <div>

    //     <h1>Password Generator</h1>

    //     <input type="text"readOnly value={password}/>
    //     <br />
    //     <button onClick={copy}>Copy</button>
    //     <label htmlFor="">Password Strength:{passwordStrength}</label>
    //     <br />

    //     <label htmlFor="">Length:{length}</label>
    //     <br />
        
    //     <input 
    //       type="range" 
    //       name="" 
    //       id="" 
    //       value={length} 
    //       onChange={(e) => setLength(parseInt(e.target.value))}
    //       ref={passwordRef}
    //     />
        
    //     <input 
    //       type="checkbox" 
    //       name="" 
    //       id="" 
    //       checked={charAllowed} 
    //       onChange={(e) => setCharAllowed(e.target.checked)}
    //     />
    //     <label htmlFor="">Numbers</label>

    //     <input 
    //       type="checkbox" 
    //       name="" 
    //       id="" 
    //       checked={numAllowed} 
    //       onChange={(e) => setNumAllowed(e.target.checked)}
    //     />
    //     <label htmlFor="">Characters</label>
    //     {/* <button onClick={generatePassword}>Generate</button> */}
    //   </div>
    // </>
    <>
    <div className="container">

  <h1>Password Generator</h1>

  <div className="password-box">
    <input
      type="text"
      readOnly
      value={password}
    />

    <button onClick={copy}>Copy</button>
  </div>
  <br />
  <div className="settings">

    <div className="length-header">
      <span>Character Length</span>
      <strong>{length}</strong>
    </div>

    <input
      type="range"
      min="4"
      max="20"
      value={length}
      onChange={(e) => setLength(parseInt(e.target.value))}
      ref={passwordRef}
    />
    
    <div className="option">
      <input
        type="checkbox"
        checked={numAllowed}
        onChange={(e) => setNumAllowed(e.target.checked)}
      />
      <label>Numbers</label>
    </div>

    <div className="option">
      <input
        type="checkbox"
        checked={charAllowed}
        onChange={(e) => setCharAllowed(e.target.checked)}
      />
      <label>Characters</label>
    </div>

    {/* <div className="strength">
      <span>STRENGTH</span>
      <strong>{passwordStrength}</strong>
    </div> */}
    <div
      className={`strength ${passwordStrength
        .toLowerCase()
        .replace(" ", "-")}`}
    >
      <span>STRENGTH</span>
      <strong>{passwordStrength.toUpperCase()}</strong>
    </div>
    
    <button
      className="generate-btn"
      onClick={generatePassword}
    >
      GENERATE →
    </button>

  </div>

</div> </>
  )
}

export default App
