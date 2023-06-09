export const contractAddress = '0xCDf246E0060c3B2A68C182b2898EBa02147F4b27';
export const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "coinAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "betAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256[5]",
            "name": "nftSkinId",
            "type": "uint256[5]"
          }
        ],
        "indexed": false,
        "internalType": "struct GameCore.BetInfo",
        "name": "betInfo",
        "type": "tuple"
      }
    ],
    "name": "Entered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user1",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user2",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "user1",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "user2",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "coinAddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "betAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256[5]",
                "name": "nftSkinId",
                "type": "uint256[5]"
              }
            ],
            "internalType": "struct GameCore.BetInfo",
            "name": "user1BetInfo",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "coinAddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "betAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256[5]",
                "name": "nftSkinId",
                "type": "uint256[5]"
              }
            ],
            "internalType": "struct GameCore.BetInfo",
            "name": "user2BetInfo",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct GameCore.GameInfo",
        "name": "gameInfo",
        "type": "tuple"
      }
    ],
    "name": "GameInited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user1",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user2",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "gameId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "user1",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "user1coinAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "user1GetAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "user2",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "user2coinAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "user2GetAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint240",
            "name": "timeStamp",
            "type": "uint240"
          }
        ],
        "indexed": false,
        "internalType": "struct GameCore.GameHistory",
        "name": "gameHistory",
        "type": "tuple"
      }
    ],
    "name": "GameSettled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "betInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "coinAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "betAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "checkOnGame",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "coinAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "despositCoin",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "coinAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "betAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256[5]",
            "name": "nftSkinId",
            "type": "uint256[5]"
          }
        ],
        "internalType": "struct GameCore.BetInfo",
        "name": "_betInfo",
        "type": "tuple"
      }
    ],
    "name": "enterGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeRecieveAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "gameHistory",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user1coinAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "user1GetAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user2",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user2coinAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "user2GetAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint240",
        "name": "timeStamp",
        "type": "uint240"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "gameInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "user1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user2",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "coinAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "betAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256[5]",
            "name": "nftSkinId",
            "type": "uint256[5]"
          }
        ],
        "internalType": "struct GameCore.BetInfo",
        "name": "user1BetInfo",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "coinAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "betAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256[5]",
            "name": "nftSkinId",
            "type": "uint256[5]"
          }
        ],
        "internalType": "struct GameCore.BetInfo",
        "name": "user2BetInfo",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAccount",
        "type": "address"
      }
    ],
    "name": "getBetInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "coinAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "betAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256[5]",
            "name": "nftSkinId",
            "type": "uint256[5]"
          }
        ],
        "internalType": "struct GameCore.BetInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "getGameInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "user1",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "user2",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "coinAddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "betAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256[5]",
                "name": "nftSkinId",
                "type": "uint256[5]"
              }
            ],
            "internalType": "struct GameCore.BetInfo",
            "name": "user1BetInfo",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "coinAddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "betAmount",
                "type": "uint256"
              },
              {
                "internalType": "uint256[5]",
                "name": "nftSkinId",
                "type": "uint256[5]"
              }
            ],
            "internalType": "struct GameCore.BetInfo",
            "name": "user2BetInfo",
            "type": "tuple"
          }
        ],
        "internalType": "struct GameCore.GameInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAccount",
        "type": "address"
      }
    ],
    "name": "getHistory",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "gameId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "user1",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "user1coinAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "user1GetAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "user2",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "user2coinAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "user2GetAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint240",
            "name": "timeStamp",
            "type": "uint240"
          }
        ],
        "internalType": "struct GameCore.GameHistory[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getShootingNft",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getShootingRole",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "roleContract",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_gameFee",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_feeRecieveAddress",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isOnGame",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user2",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "user1GetAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "user2GetAmount",
        "type": "uint256"
      }
    ],
    "name": "settleGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "shootingNft",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "shootingRole",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user2",
        "type": "address"
      }
    ],
    "name": "startGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftContract",
        "type": "address"
      }
    ],
    "name": "updateShootingNft",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "roleContract",
        "type": "address"
      }
    ],
    "name": "updateShootingRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "whitelist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];
