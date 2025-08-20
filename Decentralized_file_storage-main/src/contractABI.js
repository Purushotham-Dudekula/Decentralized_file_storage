export const CONTRACT_ADDRESS = '0x8566891754eBa14CCc9dFcc04a3E664500388b76';
export const CONTRACT_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "hashes",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x501895ae"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "time",
        "type": "uint256"
      },
      {
        "name": "hash",
        "type": "string"
      }
    ],
    "name": "setHash",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x2fbaba26"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "get",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x9507d39a"
  }
  ]
