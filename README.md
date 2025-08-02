# Basic NFT Minter

A beautiful, modern web application for minting NFTs on the Base Sepolia testnet. Built with React and designed with a stunning gradient UI, this application provides an intuitive interface for creating and managing your own NFT collection.

![NFT Minter Demo](https://via.placeholder.com/800x400?text=Basic+NFT+Minter+Demo)

## Features

### 🎨 **Modern UI/UX**
- Beautiful gradient background with glassmorphism effects
- Responsive design that works on all devices
- Real-time notifications and loading states
- Animated progress bars and hover effects

### 💰 **Wallet Integration**
- MetaMask wallet connection
- Automatic Base Sepolia network switching
- Network addition if not already configured
- Address display with copy-to-clipboard functionality

### 🖼️ **NFT Minting**
- Custom metadata URI input with validation
- Real-time minting process with loading indicators
- Transaction feedback and error handling
- Mint price display and confirmation

### 📊 **Contract Statistics**
- Total minted NFTs counter
- Max supply tracking
- Current mint price display
- Contract balance monitoring
- Visual progress bar showing collection completion

### 🎯 **NFT Management**
- Display of owned NFTs
- Token ID tracking
- Metadata link access
- Clean card-based layout for NFT showcase

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MetaMask** browser extension installed
- **Test ETH** on Base Sepolia network

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/basic-nft-minter.git
   cd basic-nft-minter
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install required packages**
   ```bash
   npm install lucide-react
   # or
   yarn add lucide-react
   ```

## Configuration

### Smart Contract Deployment

Before using the application, you need to deploy a compatible NFT smart contract to Base Sepolia:

1. **Deploy your NFT contract** with the following required functions:
   ```solidity
   function mintNFT(address to, string memory tokenURI) public payable
   function getOwnedTokens(address owner) public view returns (uint256[])
   function getNFTDetails(uint256 tokenId) public view returns (address owner, string memory tokenURI)
   function getContractStats() public view returns (uint256, uint256, uint256, uint256)
   function mintPrice() public view returns (uint256)
   function totalMinted() public view returns (uint256)
   function maxSupply() public view returns (uint256)
   ```

2. **Update the contract address** in `src/components/NFTMinterApp.js`:
   ```javascript
   const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
   ```

### Network Configuration

The application is pre-configured for Base Sepolia testnet:
- **Chain ID**: `0x14a34` (84532)
- **RPC URL**: `https://sepolia.base.org`
- **Block Explorer**: `https://sepolia.basescan.org`

## Usage

### 1. Start the Development Server
```bash
npm start
# or
yarn start
```

The application will open at `http://localhost:3000`

### 2. Connect Your Wallet
- Click "Connect Wallet" to connect your MetaMask
- The app will automatically switch to Base Sepolia network
- If the network isn't added, it will prompt to add it

### 3. Get Test ETH
- Visit [Base Sepolia Faucet](https://faucet.quicknode.com/base/sepolia) to get test ETH
- You'll need ETH to pay for minting transactions

### 4. Mint Your NFT
- Enter a valid metadata URI (JSON file hosted online)
- Click "Mint NFT" and confirm the transaction in MetaMask
- Wait for the transaction to complete

### 5. View Your Collection
- Your minted NFTs will appear in the "Your NFTs" section
- Click the metadata link to view the full NFT details

## Metadata Format

Your metadata JSON should follow the OpenSea standard:

```json
{
  "name": "My Awesome NFT #1",
  "description": "This is my first NFT created with Basic NFT Minter",
  "image": "https://your-image-url.com/image.png",
  "attributes": [
    {
      "trait_type": "Color",
      "value": "Blue"
    },
    {
      "trait_type": "Rarity",
      "value": "Common"
    }
  ]
}
```

## Project Structure

```
basic-nft-minter/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   └── NFTMinterApp.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## Technologies Used

- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Web3 APIs** - Ethereum wallet integration
- **MetaMask** - Wallet provider

## Environment Variables

Create a `.env` file in the root directory for any environment-specific configurations:

```env
REACT_APP_CONTRACT_ADDRESS=0xYourContractAddress
REACT_APP_NETWORK_NAME=base-sepolia
REACT_APP_CHAIN_ID=84532
```

## Troubleshooting

### Common Issues

**"Please install MetaMask!" error**
- Install the MetaMask browser extension
- Refresh the page after installation

**"Failed to connect wallet" error**
- Make sure MetaMask is unlocked
- Check that you're on the correct network
- Try disconnecting and reconnecting

**"Please deploy the contract" error**
- Deploy your NFT contract to Base Sepolia
- Update the `CONTRACT_ADDRESS` in the code

**Transaction fails**
- Ensure you have enough ETH for gas fees
- Check that the metadata URI is accessible
- Verify the contract is deployed correctly

### Network Issues

If you're having trouble with Base Sepolia:
1. Check [Base Status](https://status.base.org/) for network issues
2. Try using a different RPC endpoint
3. Clear MetaMask cache and reconnect

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/basic-nft-minter/issues) page
2. Create a new issue with detailed information
3. Join our [Discord community](https://discord.gg/your-server)

## Roadmap

- [ ] Support for multiple blockchain networks
- [ ] Batch minting functionality
- [ ] IPFS integration for metadata storage
- [ ] NFT preview from metadata
- [ ] Collection management features
- [ ] Mobile app version

## Acknowledgments

- Built with ❤️ for the Web3 community
- Icons by [Lucide](https://lucide.dev/)
- Inspired by modern DeFi applications
- Base network for affordable testing

---

**Happy Minting! 🎨✨**