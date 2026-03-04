export type StakingProgram = {
  address: "11111111111111111111111111111111";
  metadata: {
    name: "staking_program";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Liquid Staking Program";
  };
  version: "0.1.0";
  name: "staking_program";
  instructions: [
    {
      name: "deposit";
      discriminator: [0, 0, 0, 0, 0, 0, 0, 0];
      accounts: [
        { name: "user"; isMut: true; isSigner: true },
        { name: "pool"; isMut: true; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "amount"; type: "u64" }];
    },
    {
      name: "unstake";
      discriminator: [0, 0, 0, 0, 0, 0, 0, 1];
      accounts: [
        { name: "user"; isMut: true; isSigner: true },
        { name: "pool"; isMut: true; isSigner: false },
        { name: "ticket"; isMut: true; isSigner: false }
      ];
      args: [{ name: "amount"; type: "u64" }];
    }
  ];
  accounts: [
    {
      name: "Pool";
      discriminator: [0, 0, 0, 0, 0, 0, 0, 2];
      type: {
        kind: "struct";
        fields: [
          { name: "totalStaked"; type: "u64" },
          { name: "reserve"; type: "u64" }
        ];
      };
    },
    {
      name: "Ticket";
      discriminator: [0, 0, 0, 0, 0, 0, 0, 3];
      type: {
        kind: "struct";
        fields: [
          { name: "user"; type: "publicKey" },
          { name: "amount"; type: "u64" },
          { name: "status"; type: "u8" }
        ];
      };
    }
  ];
};

export const IDL: StakingProgram = {
  address: "11111111111111111111111111111111",
  metadata: {
    name: "staking_program",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Liquid Staking Program",
  },
  version: "0.1.0",
  name: "staking_program",
  instructions: [
    {
      name: "deposit",
      discriminator: [0, 0, 0, 0, 0, 0, 0, 0],
      accounts: [
        { name: "user", isMut: true, isSigner: true },
        { name: "pool", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "amount", type: "u64" }],
    },
    {
      name: "unstake",
      discriminator: [0, 0, 0, 0, 0, 0, 0, 1],
      accounts: [
        { name: "user", isMut: true, isSigner: true },
        { name: "pool", isMut: true, isSigner: false },
        { name: "ticket", isMut: true, isSigner: false },
      ],
      args: [{ name: "amount", type: "u64" }],
    },
  ],
  accounts: [
    {
      name: "Pool",
      discriminator: [0, 0, 0, 0, 0, 0, 0, 2],
      type: {
        kind: "struct",
        fields: [
          { name: "totalStaked", type: "u64" },
          { name: "reserve", type: "u64" },
        ],
      },
    },
    {
      name: "Ticket",
      discriminator: [0, 0, 0, 0, 0, 0, 0, 3],
      type: {
        kind: "struct",
        fields: [
          { name: "user", type: "publicKey" },
          { name: "amount", type: "u64" },
          { name: "status", type: "u8" },
        ],
      },
    },
  ],
};
