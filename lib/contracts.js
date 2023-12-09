export const BRIDGEARBSEPADDR = "0x784C5cf507E7F40D22d3BC66cD7435C83667F0a1"
export const BRIDGECELOADDR = "0xdef67A47c508cdc052f352389732E05Ee00AAB54"
export const BRIDGEETHSEPADDR = "0x823012d8cf5abAF798b731Aef12576d9DE0E5cEb"
export const ETHSEPCHAINID = "11155111"
export const ARBSEPCHAINID = "421614"
export const CELOCHAINID = "44787"
export const BRIDGEABI = [
    {
      inputs: [
        {
          internalType: "contract Inbox",
          name: "_inbox",
          type: "address",
        },
        {
          internalType: "contract Outbox",
          name: "_outbox",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "chainId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "bridgeToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "crossChainTokenBridgeMappers",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "crossTokenAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "inbox",
      outputs: [
        {
          internalType: "contract Inbox",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "outbox",
      outputs: [
        {
          internalType: "contract Outbox",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "chainId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "messageId",
          type: "uint256",
        },
      ],
      name: "releaseToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "chainId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "destinationBridgeMap",
          type: "address",
        },
      ],
      name: "setCrossChainBridgeMapper",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "destinationChainId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "sourceTokenAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "targetTokenAddress",
          type: "address",
        },
      ],
      name: "setCrossTokenAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] 