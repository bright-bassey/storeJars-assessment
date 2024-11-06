# Web3 Assessment

This is a GraphQL API that interacts with both Web2 (MongoDB) and Web3 (Smart Contract). The project includes a basic Solidity smart contract deployed on Sepolia testnet (the recommended testnet; as Rinkeby and Georli are deprecated) and a MongoDB database for user management.

## 🚀 Features

- GraphQL API with Apollo Server
- Ethereum Smart Contract Integration (Sepolia Testnet)
- MongoDB Database Integration
- TypeScript Support
- Smart Contract Testing
- Environment Configuration

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v14+ recommended)
- MongoDB Atlas Account
- Metamask Wallet with Sepolia ETH
- Alchemy Account (for Ethereum RPC URL)

## 🛠 Installation

1. **Clone the repository**

git clone https://github.com/bright-bassey/storeJars-assessment.git

2. **Install dependencies**
   cd storeJars-assessment

npx yarn

3. **Environment Setup**

Create a `.env` file in the root directory:

ETHEREUM_RPC_URL=https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
PRIVATE_KEY=your_metamask_private_key_without_0x
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

PORT=4000

## 🔥 Smart Contract Deployment

1. **Compile the contract**

npx hardhat compile

2. **Deploy to Sepolia testnet**

npx hardhat run scripts/deploy.ts --network sepolia

3. **Save the deployed contract address**

- Copy the contract address from the deployment output
- Add it to your `.env` file as `CONTRACT_ADDRESS`

## 🏃‍♂️ Running the Application

1. **Start the server**
   npx yarn dev

2. **Access GraphQL Playground**

- Open `http://localhost:4000/graphql` in your browser

## 🧪 Testing the API

### Web3 Operations (Smart Contract Interaction)

**Query stored value**

query {
getStorageValue {
value
}
}

**Set new value**

mutation {
setStorageValue(value: "42") {
value
}
}

### Web2 Operations (MongoDB)

**Create user**

mutation {
createUser(
address: "0x123..." # Use a valid Ethereum address
username: "testUser"
) {
id
username
address
}
}

**Query users**

query {
users {
id
username
address
}
}

## Testing the API

**Create User**
curl --request POST \
 --header 'content-type: application/json' \
 --url 'https://storejars-assessment-2.onrender.com/' \
 --data '{"query":"mutation { createUser(address: \"0x123456789abcdef\", username: \"testUser\") { id username address } }"}'

**Query Users**
curl --request POST \
 --header 'content-type: application/json' \
 --url 'https://storejars-assessment-2.onrender.com/' \
 --data '{"query":"query { users { id username address } }"}'

**Query Stored Value**
curl --request POST \
 --header 'content-type: application/json' \
 --url 'https://storejars-assessment-2.onrender.com/' \
 --data '{"query":"query { getStorageValue { value } }"}'

**Set New Value**
curl --request POST \
 --header 'content-type: application/json' \
 --url 'https://storejars-assessment-2.onrender.com/' \
 --data '{"query":"mutation { setStorageValue(value: \"42\") { value } }"}'

## ⚠️ Important Setup Steps

1. **Getting Sepolia ETH**

   - Visit [Sepolia Faucet](https://sepoliafaucet.com)
   - Connect your MetaMask
   - Request test ETH (required for contract deployment)

2. **MongoDB Setup**

   - Create a cluster in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Get your connection string
   - Add it to `.env` as `MONGODB_URI`
   - Whitelist your IP address in MongoDB Atlas

3. **Alchemy Setup**
   - Create an account on [Alchemy](https://www.alchemy.com/)
   - Create a new app for Sepolia network
   - Get your API key
   - Add it to `.env` as part of `ETHEREUM_RPC_URL`

## 🔒 Security Considerations

- Never commit your `.env` file
- Keep your private keys secure
- Use a development wallet for testing
- Implement proper error handling
- Validate all inputs

## 🧪 Running Tests

npx hardhat test
