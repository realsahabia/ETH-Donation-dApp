import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import { FaHeart } from 'react-icons/fa';

import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../Constants/constants';

function App() {
  // State variables
  const [donations, setDonations] = useState([])
  const [signerAddress, setSignerAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false)
  const [contract, setContract] = useState(null)
  const [errorMessage, setErrorMessage] = useState('');
  const [amount, setAmount] = useState(0);
  const [totalDonated, setTotalDonated] = useState(0);

  // Function to connect wallet
  const connectWalletHandler = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request access to accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          setSignerAddress(result[0])
          setIsConnected(true)
          getDataFromBlockchain();
        })
      } else {
        throw new Error('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
    }
  };

  // Function to load data from the blockchain
  const getDataFromBlockchain = async () => {
    try{
      // Create a provider based on the user's networkId
      let provider =  new ethers.BrowserProvider(window.ethereum);

      // Reguest signer
      let signer = await provider.getSigner();
      console.log(signer)

      // load contract and display its data
      let contractInstance  = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      // console.log(contractInstance)
      setContract(contractInstance);

      // Fetch initial donation data
      await getAllDonations();

    }catch(err){
      setErrorMessage(`Failed to fetch data: ${err}`);
    }
  }

  async function sendDonation() {
    try {
        // Check if contract and signer are initialized
        if (contract && signerAddress) {
            // Convert amount to wei (1 ether = 10^18 wei)
            const amountInWei = ethers.parseEther(amount);

            // Call the contract's receiveDonation function 
            // by sending a transaction with the donation amount
            const tx = await contract.receiveDonation({ value: amountInWei });

            // Wait for the transaction to be mined
            await tx.wait();

            // Update UI 
            alert("Donation successful");

            // Refresh donation data
            await getAllDonations();
        } else {
            throw new Error("Contract or signer not initialized");
        }
    } catch (error) {
        console.error("Error sending donation:", error.message);
        // Set error message state variable to display error to the user
        setErrorMessage(`Error sending donation: ${error.message}`);
    }
  }
  
  const getAllDonations = async () => {
    try {
      let donations = await contract.getAllDonations();

      console.log(donations)

      setDonations(donations);

    } catch(error){
      console.log(error)
    }
  }

   // Fetch initial donation data when the component mounts
   useEffect(() => {
    getDataFromBlockchain();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex gap-40" style={{width: '800px'}}>

          <div className="flex flex-col">
            <div className="flex">
              <div className="w-full">
                <h1 className="donateHeader">Donate ETH</h1>
              </div>
            </div>

            <div className="donateButtons">
              <div className="flex">
                <div className="amountButtonLeft">
                  <a
                  onClick={ () => setAmount('0.01') }
                  className={"amountButton " + (amount === '0.01' ? 'amountClicked' : '')}>
                    0.01
                  </a>
                </div>
                <div className="w-full amountButtonRight">
                  <a
                  onClick={ () => setAmount('0.05') }
                  className={"amountButton " + (amount === '0.05' ? 'amountClicked' : '')}>
                    0.05
                  </a>
                </div>
              </div>

              <div className="flex">
                <div className="amountButtonLeft">
                  <a
                  onClick={ () => setAmount('0.1') }
                  className={"amountButton " + (amount === '0.1' ? 'amountClicked' : '')}>
                    0.1
                  </a>
                </div>
                <div className="w-full amountButtonRight">
                  <a
                  onClick={ () => setAmount('0.2') }
                  className={"amountButton " + (amount === '0.2' ? 'amountClicked' : '')}>
                    0.2
                  </a>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-center items-center my-5">
              <div className="flex flex-col w-full gap-4 justify-center">
                {isConnected ? (
                  <div className="flex flex-col-reverse justify-center items-center">
                    <div className="flex gap-2 items-center justify-center">
                      <span className="dot greenDot"></span>
                      <p style={{fontSize: '16px'}}>connected</p>
                    </div>
                    <button
                      onClick={() => sendDonation()}
                      className="text-[16px] font-bold text-white bg-yellow-700 shadow-md rounded p-2">
                      Click To Donate
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col-reverse justify-center items-center">
                    <div className="flex gap-2 items-center justify-center">
                      <span className="dot redDot"></span>
                      <p className="" style={{fontSize: '16px'}}>Not connected</p>
                    </div>
                    <button onClick={connectWalletHandler} className="text-[16px] font-bold text-black bg-yellow-500 shadow-md rounded p-2">
                      Connect Wallet
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-20">
            <h1 className="donateHeader">Total Amount Raised!</h1>
            <div className="amountButton w-full">{totalDonated}</div>
            </div>
          </div>

          <div className="w-[50%] flex flex-col justify-start">
          <div className="">
            <div className="flex">
              <div className="w-full">
                <h1 className="donateHeader">Recent Donations</h1>
              </div>
            </div>
            </div>
            <div>
             {/* Display recent donations */}
             {donations.map((donation, idx) => (
              <div key={idx} className="donationBubbleLeft">
                <FaHeart className="text-[#a73348]"/>
                <span className="paddingLeft">
                  {donation.amount} ETH
                  &nbsp;
                  <span className="byAddress">by {donation.donor}</span>
                </span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
