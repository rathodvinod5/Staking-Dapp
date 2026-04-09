export type StakingProgram = {
  "address": "BhHah6xCWoHUvE2gyqba5vSTTyRYHzyjjTsqXX55H4AV",
  "metadata": {
    "name": "stakely",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "deactivateStakeAccount",
      "discriminator": [
        217,
        64,
        76,
        16,
        216,
        77,
        123,
        226
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "pool",
          "writable": true,
          "relations": [
            "stakeEntry"
          ]
        },
        {
          "name": "stakeAccount",
          "writable": true
        },
        {
          "name": "stakeEntry",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "depositAndDelegate",
      "discriminator": [
        220,
        171,
        120,
        159,
        4,
        192,
        223,
        110
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "pool",
          "writable": true
        },
        {
          "name": "reserveAccount",
          "writable": true
        },
        {
          "name": "stakeAccount",
          "writable": true
        },
        {
          "name": "lstMint",
          "writable": true
        },
        {
          "name": "userAta",
          "writable": true
        },
        {
          "name": "stakeEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  45,
                  101,
                  110,
                  116,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "stakeAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializePool",
      "discriminator": [
        95,
        180,
        10,
        172,
        84,
        174,
        232,
        40
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "lstMint"
              }
            ]
          }
        },
        {
          "name": "reserveAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  45,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lstMint",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "mockAccrueRewards",
      "discriminator": [
        236,
        240,
        90,
        193,
        176,
        37,
        25,
        70
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "pool",
          "writable": true
        },
        {
          "name": "reserveAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  45,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "pool"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "reawrdLamprts",
          "type": "u64"
        }
      ]
    },
    {
      "name": "processUnstake",
      "discriminator": [
        217,
        160,
        136,
        174,
        149,
        62,
        79,
        133
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "requester",
          "writable": true
        },
        {
          "name": "pool",
          "writable": true,
          "relations": [
            "unstakeTicket"
          ]
        },
        {
          "name": "reserveAccount",
          "writable": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "unstakeTicket",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "requestUnstake",
      "discriminator": [
        44,
        154,
        110,
        253,
        160,
        202,
        54,
        34
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userTokenAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "lstMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "pool",
          "writable": true,
          "relations": [
            "stakeEntry"
          ]
        },
        {
          "name": "lstMint",
          "writable": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "stakeEntry",
          "writable": true
        },
        {
          "name": "unstakeTicket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  110,
                  115,
                  116,
                  97,
                  107,
                  101,
                  45,
                  116,
                  105,
                  99,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "pool.unstakedCount",
                "account": "pool"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "withdrawStakeAccount",
      "discriminator": [
        211,
        85,
        184,
        65,
        183,
        177,
        233,
        217
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "pool",
          "writable": true,
          "relations": [
            "stakeEntry"
          ]
        },
        {
          "name": "reserveAccount",
          "writable": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "stakeAccount",
          "writable": true
        },
        {
          "name": "stakeEntry",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "pool",
      "discriminator": [
        241,
        154,
        109,
        4,
        17,
        177,
        109,
        188
      ]
    },
    {
      "name": "stakeEntry",
      "discriminator": [
        187,
        127,
        9,
        35,
        155,
        68,
        86,
        40
      ]
    },
    {
      "name": "unstakeTicket",
      "discriminator": [
        131,
        84,
        209,
        38,
        145,
        157,
        181,
        127
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "mathOverflow",
      "msg": "Math Overflow"
    },
    {
      "code": 6001,
      "name": "notTheOwner",
      "msg": "Not the owner"
    },
    {
      "code": 6002,
      "name": "insufficientBalance",
      "msg": "Insufficient balance"
    },
    {
      "code": 6003,
      "name": "reserveOutOfBalance",
      "msg": "Reserve out of balance"
    },
    {
      "code": 6004,
      "name": "insufficientUserTokenBalance",
      "msg": "Insufficient user token balance"
    },
    {
      "code": 6005,
      "name": "insufficientStakeAmount",
      "msg": "Insufficient stake amount"
    },
    {
      "code": 6006,
      "name": "noActiveStake",
      "msg": "No active stake"
    },
    {
      "code": 6007,
      "name": "emptyPool",
      "msg": "Empty pool"
    },
    {
      "code": 6008,
      "name": "fundAlreadyReleased",
      "msg": "Fund already released!"
    },
    {
      "code": 6009,
      "name": "keyMismatch",
      "msg": "Key mismatch"
    },
    {
      "code": 6010,
      "name": "invalidStakeAccount",
      "msg": "Invalid stake account"
    },
    {
      "code": 6011,
      "name": "stakeNotYetDeactivated",
      "msg": "Stake account not deactivated!"
    },
    {
      "code": 6012,
      "name": "invalidStakeState",
      "msg": "Invalid stake state"
    },
    {
      "code": 6013,
      "name": "invalidUnstakeAmount",
      "msg": "Unstake amount should be greater then 0"
    },
    {
      "code": 6014,
      "name": "noActiveStakes",
      "msg": "No active stake entry"
    },
    {
      "code": 6015,
      "name": "invalidStakeAmount",
      "msg": "Invalid stake amount"
    }
  ],
  "types": [
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "reserveAccount",
            "type": "pubkey"
          },
          {
            "name": "lstMint",
            "type": "pubkey"
          },
          {
            "name": "totalStaked",
            "type": "u128"
          },
          {
            "name": "totalLstMinted",
            "type": "u128"
          },
          {
            "name": "stakedCount",
            "type": "u64"
          },
          {
            "name": "unstakedCount",
            "type": "u64"
          },
          {
            "name": "lstDecimals",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "reserveBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "stakeEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "pubkey"
          },
          {
            "name": "stakeAccount",
            "type": "pubkey"
          },
          {
            "name": "validatorVoter",
            "type": "pubkey"
          },
          {
            "name": "depositedLamports",
            "type": "u128"
          },
          {
            "name": "stakeStatus",
            "type": {
              "defined": {
                "name": "stakeStatus"
              }
            }
          },
          {
            "name": "index",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "stakeStatus",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "active"
          },
          {
            "name": "deactivating"
          },
          {
            "name": "deactive"
          }
        ]
      }
    },
    {
      "name": "unstakeTicket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "pubkey"
          },
          {
            "name": "requester",
            "type": "pubkey"
          },
          {
            "name": "requestedAmount",
            "type": "u128"
          },
          {
            "name": "isReleased",
            "type": "bool"
          },
          {
            "name": "index",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const IDL: StakingProgram = {
  "address": "BhHah6xCWoHUvE2gyqba5vSTTyRYHzyjjTsqXX55H4AV",
  "metadata": {
    "name": "stakely",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "deactivateStakeAccount",
      "discriminator": [
        217,
        64,
        76,
        16,
        216,
        77,
        123,
        226
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "pool",
          "writable": true,
          "relations": [
            "stakeEntry"
          ]
        },
        {
          "name": "stakeAccount",
          "writable": true
        },
        {
          "name": "stakeEntry",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "depositAndDelegate",
      "discriminator": [
        220,
        171,
        120,
        159,
        4,
        192,
        223,
        110
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "pool",
          "writable": true
        },
        {
          "name": "reserveAccount",
          "writable": true
        },
        {
          "name": "stakeAccount",
          "writable": true
        },
        {
          "name": "lstMint",
          "writable": true
        },
        {
          "name": "userAta",
          "writable": true
        },
        {
          "name": "stakeEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  45,
                  101,
                  110,
                  116,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "stakeAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializePool",
      "discriminator": [
        95,
        180,
        10,
        172,
        84,
        174,
        232,
        40
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "pool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "lstMint"
              }
            ]
          }
        },
        {
          "name": "reserveAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  45,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          }
        },
        {
          "name": "lstMint",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "mockAccrueRewards",
      "discriminator": [
        236,
        240,
        90,
        193,
        176,
        37,
        25,
        70
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "pool",
          "writable": true
        },
        {
          "name": "reserveAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  45,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              }
            ]
          },
          "relations": [
            "pool"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "reawrdLamprts",
          "type": "u64"
        }
      ]
    },
    {
      "name": "processUnstake",
      "discriminator": [
        217,
        160,
        136,
        174,
        149,
        62,
        79,
        133
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "requester",
          "writable": true
        },
        {
          "name": "pool",
          "writable": true,
          "relations": [
            "unstakeTicket"
          ]
        },
        {
          "name": "reserveAccount",
          "writable": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "unstakeTicket",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "requestUnstake",
      "discriminator": [
        44,
        154,
        110,
        253,
        160,
        202,
        54,
        34
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userTokenAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "lstMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "pool",
          "writable": true,
          "relations": [
            "stakeEntry"
          ]
        },
        {
          "name": "lstMint",
          "writable": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "stakeEntry",
          "writable": true
        },
        {
          "name": "unstakeTicket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  110,
                  115,
                  116,
                  97,
                  107,
                  101,
                  45,
                  116,
                  105,
                  99,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "pool"
              },
              {
                "kind": "account",
                "path": "pool.unstakedCount",
                "account": "pool"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "withdrawStakeAccount",
      "discriminator": [
        211,
        85,
        184,
        65,
        183,
        177,
        233,
        217
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "pool",
          "writable": true,
          "relations": [
            "stakeEntry"
          ]
        },
        {
          "name": "reserveAccount",
          "writable": true,
          "relations": [
            "pool"
          ]
        },
        {
          "name": "stakeAccount",
          "writable": true
        },
        {
          "name": "stakeEntry",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "pool",
      "discriminator": [
        241,
        154,
        109,
        4,
        17,
        177,
        109,
        188
      ]
    },
    {
      "name": "stakeEntry",
      "discriminator": [
        187,
        127,
        9,
        35,
        155,
        68,
        86,
        40
      ]
    },
    {
      "name": "unstakeTicket",
      "discriminator": [
        131,
        84,
        209,
        38,
        145,
        157,
        181,
        127
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "mathOverflow",
      "msg": "Math Overflow"
    },
    {
      "code": 6001,
      "name": "notTheOwner",
      "msg": "Not the owner"
    },
    {
      "code": 6002,
      "name": "insufficientBalance",
      "msg": "Insufficient balance"
    },
    {
      "code": 6003,
      "name": "reserveOutOfBalance",
      "msg": "Reserve out of balance"
    },
    {
      "code": 6004,
      "name": "insufficientUserTokenBalance",
      "msg": "Insufficient user token balance"
    },
    {
      "code": 6005,
      "name": "insufficientStakeAmount",
      "msg": "Insufficient stake amount"
    },
    {
      "code": 6006,
      "name": "noActiveStake",
      "msg": "No active stake"
    },
    {
      "code": 6007,
      "name": "emptyPool",
      "msg": "Empty pool"
    },
    {
      "code": 6008,
      "name": "fundAlreadyReleased",
      "msg": "Fund already released!"
    },
    {
      "code": 6009,
      "name": "keyMismatch",
      "msg": "Key mismatch"
    },
    {
      "code": 6010,
      "name": "invalidStakeAccount",
      "msg": "Invalid stake account"
    },
    {
      "code": 6011,
      "name": "stakeNotYetDeactivated",
      "msg": "Stake account not deactivated!"
    },
    {
      "code": 6012,
      "name": "invalidStakeState",
      "msg": "Invalid stake state"
    },
    {
      "code": 6013,
      "name": "invalidUnstakeAmount",
      "msg": "Unstake amount should be greater then 0"
    },
    {
      "code": 6014,
      "name": "noActiveStakes",
      "msg": "No active stake entry"
    },
    {
      "code": 6015,
      "name": "invalidStakeAmount",
      "msg": "Invalid stake amount"
    }
  ],
  "types": [
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "reserveAccount",
            "type": "pubkey"
          },
          {
            "name": "lstMint",
            "type": "pubkey"
          },
          {
            "name": "totalStaked",
            "type": "u128"
          },
          {
            "name": "totalLstMinted",
            "type": "u128"
          },
          {
            "name": "stakedCount",
            "type": "u64"
          },
          {
            "name": "unstakedCount",
            "type": "u64"
          },
          {
            "name": "lstDecimals",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "reserveBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "stakeEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "pubkey"
          },
          {
            "name": "stakeAccount",
            "type": "pubkey"
          },
          {
            "name": "validatorVoter",
            "type": "pubkey"
          },
          {
            "name": "depositedLamports",
            "type": "u128"
          },
          {
            "name": "stakeStatus",
            "type": {
              "defined": {
                "name": "stakeStatus"
              }
            }
          },
          {
            "name": "index",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "stakeStatus",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "active"
          },
          {
            "name": "deactivating"
          },
          {
            "name": "deactive"
          }
        ]
      }
    },
    {
      "name": "unstakeTicket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "pubkey"
          },
          {
            "name": "requester",
            "type": "pubkey"
          },
          {
            "name": "requestedAmount",
            "type": "u128"
          },
          {
            "name": "isReleased",
            "type": "bool"
          },
          {
            "name": "index",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
