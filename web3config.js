import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // Use MetaMask provider
  web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // Request account access if needed
} else {
  // Fallback to Infura or other provider
  const provider = new Web3.providers.HttpProvider('<YOUR_INFURA_API_KEY>');
  web3 = new Web3(provider);
}

export default web3;