export type StakingProgram = {
  address: "BhHah6xCWoHUvE2gyqba5vSTTyRYHzyjjTsqXX55H4AV";
  metadata: {
    name: "stakely";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "accrue_rewards";
      discriminator: [197, 188, 54, 32, 63, 34, 71, 215];
      accounts: [
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "pool";
          writable: true;
        },
        {
          name: "reserve";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  111,
                  111,
                  108,
                  95,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101,
                ];
              },
            ];
          };
          relations: ["pool"];
        },
        {
          name: "system_program";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "reawrd_lamprts";
          type: "u64";
        },
      ];
    },
    {
      name: "deactivate_account";
      discriminator: [26, 135, 56, 27, 93, 254, 202, 122];
      accounts: [
        {
          name: "admin";
          writable: true;
          signer: true;
          relations: ["pool"];
        },
        {
          name: "pool";
          writable: true;
        },
        {
          name: "stake_account";
          writable: true;
        },
        {
          name: "stake_entry";
          writable: true;
        },
        {
          name: "stake_program";
          address: "Stake11111111111111111111111111111111111111";
        },
        {
          name: "clock";
          address: "SysvarC1ock11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "deposit_stake";
      discriminator: [160, 167, 9, 220, 74, 243, 228, 43];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "pool";
          writable: true;
        },
        {
          name: "stake_account";
          writable: true;
        },
        {
          name: "reserve_account";
          writable: true;
        },
        {
          name: "validator_vote";
          writable: true;
        },
        {
          name: "stake_entry";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 116, 97, 107, 101, 95, 101, 110, 116, 114, 121];
              },
              {
                kind: "account";
                path: "stake_account";
              },
            ];
          };
        },
        {
          name: "lst_mint";
          writable: true;
        },
        {
          name: "user_token_ata";
          writable: true;
        },
        {
          name: "system_program";
          address: "11111111111111111111111111111111";
        },
        {
          name: "token_program";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "stake_amount";
          type: "u64";
        },
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "lst_mint";
          writable: true;
        },
        {
          name: "pool";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 111, 108];
              },
              {
                kind: "account";
                path: "lst_mint";
              },
            ];
          };
        },
        {
          name: "reserve";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  111,
                  111,
                  108,
                  95,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101,
                ];
              },
              {
                kind: "account";
                path: "pool";
              },
            ];
          };
        },
        {
          name: "system_program";
          address: "11111111111111111111111111111111";
        },
        {
          name: "token_program";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "lst_decimals";
          type: "u8";
        },
      ];
    },
    {
      name: "process_unstake";
      discriminator: [217, 160, 136, 174, 149, 62, 79, 133];
      accounts: [
        {
          name: "requester";
          writable: true;
        },
        {
          name: "pool";
          writable: true;
        },
        {
          name: "reserve";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  111,
                  111,
                  108,
                  95,
                  114,
                  101,
                  115,
                  101,
                  114,
                  118,
                  101,
                ];
              },
              {
                kind: "account";
                path: "pool";
              },
            ];
          };
          relations: ["pool"];
        },
        {
          name: "unstake_ticket";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  110,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  116,
                  105,
                  99,
                  107,
                  101,
                  116,
                ];
              },
              {
                kind: "account";
                path: "pool";
              },
              {
                kind: "account";
                path: "pool.unstaked_count";
                account: "Pool";
              },
            ];
          };
        },
        {
          name: "system_program";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "unstake";
      discriminator: [90, 95, 107, 42, 205, 124, 50, 225];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "pool";
          writable: true;
        },
        {
          name: "lst_mint";
          writable: true;
        },
        {
          name: "user_token_ata";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "const";
                value: [
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
                  169,
                ];
              },
              {
                kind: "account";
                path: "lst_mint";
              },
            ];
            program: {
              kind: "const";
              value: [
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
                89,
              ];
            };
          };
        },
        {
          name: "stake_entry";
          writable: true;
        },
        {
          name: "unstake_ticket";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  110,
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  116,
                  105,
                  99,
                  107,
                  101,
                  116,
                ];
              },
              {
                kind: "account";
                path: "pool";
              },
              {
                kind: "account";
                path: "pool.unstaked_count";
                account: "Pool";
              },
            ];
          };
        },
        {
          name: "system_program";
          address: "11111111111111111111111111111111";
        },
        {
          name: "token_program";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
      ];
      args: [
        {
          name: "unstake_token_lst_amount";
          type: "u64";
        },
      ];
    },
  ];
  accounts: [
    {
      name: "Pool";
      discriminator: [241, 154, 109, 4, 17, 177, 109, 188];
    },
    {
      name: "StakeEntry";
      discriminator: [187, 127, 9, 35, 155, 68, 86, 40];
    },
    {
      name: "UnstakeTicket";
      discriminator: [131, 84, 209, 38, 145, 157, 181, 127];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "MathOverflow";
      msg: "Math Overflow";
    },
    {
      code: 6001;
      name: "NotTheOwner";
      msg: "Not the owner";
    },
    {
      code: 6002;
      name: "InsufficientBalance";
      msg: "Insufficient balance";
    },
    {
      code: 6003;
      name: "InsufficientTokensRecord";
      msg: "Insufficient token record";
    },
    {
      code: 6004;
      name: "ReserveOutOfBalance";
      msg: "Reserve out of balance";
    },
    {
      code: 6005;
      name: "InsufficientUserTokenBalance";
      msg: "Insufficient user token balance";
    },
    {
      code: 6006;
      name: "InsufficientStakeAmount";
      msg: "Insufficient stake amount";
    },
    {
      code: 6007;
      name: "NoActiveStake";
      msg: "No active stake";
    },
    {
      code: 6008;
      name: "EmptyPool";
      msg: "Empty pool";
    },
    {
      code: 6009;
      name: "FundAlreadyReleased";
      msg: "Fund already released!";
    },
    {
      code: 6010;
      name: "KeyMismatch";
      msg: "Key mismatch";
    },
    {
      code: 6011;
      name: "InvalidStakeAccount";
      msg: "Invalid stake account";
    },
    {
      code: 6012;
      name: "StakeNotYetDeactivated";
      msg: "Stake account not deactivated!";
    },
    {
      code: 6013;
      name: "InvalidStakeState";
      msg: "Invalid stake state";
    },
  ];
  types: [
    {
      name: "Pool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "reserve";
            type: "pubkey";
          },
          {
            name: "lst_mint";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "total_staked";
            type: "u128";
          },
          {
            name: "total_lst_minted";
            type: "u128";
          },
          {
            name: "staked_count";
            type: "u64";
          },
          {
            name: "unstaked_count";
            type: "u64";
          },
          {
            name: "lst_decimals";
            type: "u8";
          },
          {
            name: "deactivating_stake_accounts";
            type: {
              vec: "pubkey";
            };
          },
        ];
      };
    },
    {
      name: "StakeEntry";
      type: {
        kind: "struct";
        fields: [
          {
            name: "pool";
            type: "pubkey";
          },
          {
            name: "stake_account";
            type: "pubkey";
          },
          {
            name: "validator_voter";
            type: "pubkey";
          },
          {
            name: "deposited_lamports";
            type: "u128";
          },
          {
            name: "status";
            type: {
              defined: {
                name: "StakeStatus";
              };
            };
          },
          {
            name: "index";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "StakeStatus";
      repr: {
        kind: "rust";
      };
      type: {
        kind: "enum";
        variants: [
          {
            name: "Active";
          },
          {
            name: "Deactivating";
          },
          {
            name: "Deactive";
          },
        ];
      };
    },
    {
      name: "UnstakeTicket";
      type: {
        kind: "struct";
        fields: [
          {
            name: "pool";
            type: "pubkey";
          },
          {
            name: "requester";
            type: "pubkey";
          },
          {
            name: "requested_lamports";
            type: "u128";
          },
          {
            name: "released";
            type: "bool";
          },
          {
            name: "index";
            type: "u64";
          },
        ];
      };
    },
  ];
};

export const IDL: StakingProgram = {
  address: "BhHah6xCWoHUvE2gyqba5vSTTyRYHzyjjTsqXX55H4AV",
  metadata: {
    name: "stakely",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "accrue_rewards",
      discriminator: [197, 188, 54, 32, 63, 34, 71, 215],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
        },
        {
          name: "pool",
          writable: true,
        },
        {
          name: "reserve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  112, 111, 111, 108, 95, 114, 101, 115, 101, 114, 118, 101,
                ],
              },
            ],
          },
          relations: ["pool"],
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "reawrd_lamprts",
          type: "u64",
        },
      ],
    },
    {
      name: "deactivate_account",
      discriminator: [26, 135, 56, 27, 93, 254, 202, 122],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
          relations: ["pool"],
        },
        {
          name: "pool",
          writable: true,
        },
        {
          name: "stake_account",
          writable: true,
        },
        {
          name: "stake_entry",
          writable: true,
        },
        {
          name: "stake_program",
          address: "Stake11111111111111111111111111111111111111",
        },
        {
          name: "clock",
          address: "SysvarC1ock11111111111111111111111111111111",
        },
      ],
      args: [],
    },
    {
      name: "deposit_stake",
      discriminator: [160, 167, 9, 220, 74, 243, 228, 43],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "pool",
          writable: true,
        },
        {
          name: "stake_account",
          writable: true,
        },
        {
          name: "reserve_account",
          writable: true,
        },
        {
          name: "validator_vote",
          writable: true,
        },
        {
          name: "stake_entry",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [115, 116, 97, 107, 101, 95, 101, 110, 116, 114, 121],
              },
              {
                kind: "account",
                path: "stake_account",
              },
            ],
          },
        },
        {
          name: "lst_mint",
          writable: true,
        },
        {
          name: "user_token_ata",
          writable: true,
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "rent",
          address: "SysvarRent111111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "stake_amount",
          type: "u64",
        },
      ],
    },
    {
      name: "initialize",
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
        },
        {
          name: "lst_mint",
          writable: true,
        },
        {
          name: "pool",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [112, 111, 111, 108],
              },
              {
                kind: "account",
                path: "lst_mint",
              },
            ],
          },
        },
        {
          name: "reserve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  112, 111, 111, 108, 95, 114, 101, 115, 101, 114, 118, 101,
                ],
              },
              {
                kind: "account",
                path: "pool",
              },
            ],
          },
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        {
          name: "rent",
          address: "SysvarRent111111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "lst_decimals",
          type: "u8",
        },
      ],
    },
    {
      name: "process_unstake",
      discriminator: [217, 160, 136, 174, 149, 62, 79, 133],
      accounts: [
        {
          name: "requester",
          writable: true,
        },
        {
          name: "pool",
          writable: true,
        },
        {
          name: "reserve",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  112, 111, 111, 108, 95, 114, 101, 115, 101, 114, 118, 101,
                ],
              },
              {
                kind: "account",
                path: "pool",
              },
            ],
          },
          relations: ["pool"],
        },
        {
          name: "unstake_ticket",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  117, 110, 115, 116, 97, 107, 101, 95, 116, 105, 99, 107, 101,
                  116,
                ],
              },
              {
                kind: "account",
                path: "pool",
              },
              {
                kind: "account",
                path: "pool.unstaked_count",
                account: "Pool",
              },
            ],
          },
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [],
    },
    {
      name: "unstake",
      discriminator: [90, 95, 107, 42, 205, 124, 50, 225],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "pool",
          writable: true,
        },
        {
          name: "lst_mint",
          writable: true,
        },
        {
          name: "user_token_ata",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "account",
                path: "user",
              },
              {
                kind: "const",
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: "account",
                path: "lst_mint",
              },
            ],
            program: {
              kind: "const",
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: "stake_entry",
          writable: true,
        },
        {
          name: "unstake_ticket",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [
                  117, 110, 115, 116, 97, 107, 101, 95, 116, 105, 99, 107, 101,
                  116,
                ],
              },
              {
                kind: "account",
                path: "pool",
              },
              {
                kind: "account",
                path: "pool.unstaked_count",
                account: "Pool",
              },
            ],
          },
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
        {
          name: "token_program",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
      ],
      args: [
        {
          name: "unstake_token_lst_amount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Pool",
      discriminator: [241, 154, 109, 4, 17, 177, 109, 188],
    },
    {
      name: "StakeEntry",
      discriminator: [187, 127, 9, 35, 155, 68, 86, 40],
    },
    {
      name: "UnstakeTicket",
      discriminator: [131, 84, 209, 38, 145, 157, 181, 127],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "MathOverflow",
      msg: "Math Overflow",
    },
    {
      code: 6001,
      name: "NotTheOwner",
      msg: "Not the owner",
    },
    {
      code: 6002,
      name: "InsufficientBalance",
      msg: "Insufficient balance",
    },
    {
      code: 6003,
      name: "InsufficientTokensRecord",
      msg: "Insufficient token record",
    },
    {
      code: 6004,
      name: "ReserveOutOfBalance",
      msg: "Reserve out of balance",
    },
    {
      code: 6005,
      name: "InsufficientUserTokenBalance",
      msg: "Insufficient user token balance",
    },
    {
      code: 6006,
      name: "InsufficientStakeAmount",
      msg: "Insufficient stake amount",
    },
    {
      code: 6007,
      name: "NoActiveStake",
      msg: "No active stake",
    },
    {
      code: 6008,
      name: "EmptyPool",
      msg: "Empty pool",
    },
    {
      code: 6009,
      name: "FundAlreadyReleased",
      msg: "Fund already released!",
    },
    {
      code: 6010,
      name: "KeyMismatch",
      msg: "Key mismatch",
    },
    {
      code: 6011,
      name: "InvalidStakeAccount",
      msg: "Invalid stake account",
    },
    {
      code: 6012,
      name: "StakeNotYetDeactivated",
      msg: "Stake account not deactivated!",
    },
    {
      code: 6013,
      name: "InvalidStakeState",
      msg: "Invalid stake state",
    },
  ],
  types: [
    {
      name: "Pool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            type: "pubkey",
          },
          {
            name: "reserve",
            type: "pubkey",
          },
          {
            name: "lst_mint",
            type: "pubkey",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "total_staked",
            type: "u128",
          },
          {
            name: "total_lst_minted",
            type: "u128",
          },
          {
            name: "staked_count",
            type: "u64",
          },
          {
            name: "unstaked_count",
            type: "u64",
          },
          {
            name: "lst_decimals",
            type: "u8",
          },
          {
            name: "deactivating_stake_accounts",
            type: {
              vec: "pubkey",
            },
          },
        ],
      },
    },
    {
      name: "StakeEntry",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pool",
            type: "pubkey",
          },
          {
            name: "stake_account",
            type: "pubkey",
          },
          {
            name: "validator_voter",
            type: "pubkey",
          },
          {
            name: "deposited_lamports",
            type: "u128",
          },
          {
            name: "status",
            type: {
              defined: {
                name: "StakeStatus",
              },
            },
          },
          {
            name: "index",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "StakeStatus",
      repr: {
        kind: "rust",
      },
      type: {
        kind: "enum",
        variants: [
          {
            name: "Active",
          },
          {
            name: "Deactivating",
          },
          {
            name: "Deactive",
          },
        ],
      },
    },
    {
      name: "UnstakeTicket",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pool",
            type: "pubkey",
          },
          {
            name: "requester",
            type: "pubkey",
          },
          {
            name: "requested_lamports",
            type: "u128",
          },
          {
            name: "released",
            type: "bool",
          },
          {
            name: "index",
            type: "u64",
          },
        ],
      },
    },
  ],
};
