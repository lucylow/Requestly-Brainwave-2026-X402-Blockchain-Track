import { AlgorandClient } from '@algorandfoundation/algokit-utils';

const client = AlgorandClient.testNet();

// Deploy the contract
const result = await client.deploy({
  contract: 'requestly_contract',
  sender: process.env.AVM_ADDRESS,
  parameters: {
    price: 1000, // 0.001 USDC
    owner: process.env.AVM_ADDRESS
  }
});

console.log('Contract deployed at:', result.appId);
