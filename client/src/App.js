import './App.css';
import React, {useState, useEffect} from 'react';
import {ethers} from "ethers"
import artifacts from 

function App() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [amount, setAmount] = useState(0)
  const [donations, setDonations] = useState([])





  return (
    <div className="App">
      <header className="App-header">
        <img src={null} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
