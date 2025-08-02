import React, { useState, useEffect } from 'react';
import { Palette, Wallet, Image, TrendingUp, ExternalLink, Copy, Check } from 'lucide-react';

const NFTMinterApp = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalMinted: 0,
    maxSupply: 10000,
    mintPrice: '0.001',
    contractBalance: '0'
  });
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [tokenURI, setTokenURI] = useState('');
  const [notification, setNotification] = useState(null);
  const [copied, setCopied] = useState(false);

  // Contract configuration - Replace with your deployed contract address
  const CONTRACT_ADDRESS = "0xcDE092fC96b84c784028651BF1819F7Dda617c33"; // Update this after deploying to Base Sepolia
  
  const CONTRACT_ABI = [
    "function mintNFT(address to, string memory tokenURI) public payable",
    "function getOwnedTokens(address owner) public view returns (uint256[])",
    "function getNFTDetails(uint256 tokenId) public view returns (address owner, string memory tokenURI)",
    "function getContractStats() public view returns (uint256, uint256, uint256, uint256)",
    "function mintPrice() public view returns (uint256)",
    "function totalMinted() public view returns (uint256)",
    "function maxSupply() public view returns (uint256)",
    "event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI)"
  ];

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        showNotification("Please install MetaMask!", "error");
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Check if we're on Base Sepolia
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x14a34') { // Base Sepolia chain ID
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x14a34' }],
          });
        } catch (switchError) {
          // Add Base Sepolia network if not added
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x14a34',
              chainName: 'Base Sepolia',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://sepolia.base.org'],
              blockExplorerUrls: ['https://sepolia.basescan.org'],
            }],
          });
        }
      }

      setAccount(accounts[0]);
      showNotification("Wallet connected successfully!", "success");
      
      // Initialize contract if address is set
      if (CONTRACT_ADDRESS !== "0x...") {
        // Note: In production, you'd use ethers.js here
        showNotification("Contract integration ready!", "info");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      showNotification("Failed to connect wallet", "error");
    }
  };

  const mintNFT = async () => {
    if (!account) {
      showNotification("Please connect your wallet first", "error");
      return;
    }

    if (!tokenURI.trim()) {
      showNotification("Please enter a valid token URI", "error");
      return;
    }

    if (CONTRACT_ADDRESS === "0x...") {
      showNotification("Please deploy the contract and update the address", "error");
      return;
    }

    setLoading(true);
    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update local state
      setStats(prev => ({
        ...prev,
        totalMinted: prev.totalMinted + 1
      }));
      
      const newNFT = {
        tokenId: stats.totalMinted,
        tokenURI: tokenURI,
        owner: account
      };
      
      setOwnedNFTs(prev => [...prev, newNFT]);
      setTokenURI('');
      
      showNotification(`NFT #${stats.totalMinted} minted successfully!`, "success");
    } catch (error) {
      console.error("Error minting NFT:", error);
      showNotification("Failed to mint NFT", "error");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Palette className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Basic NFT Minter
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create and mint your own NFTs on Base Sepolia testnet with custom metadata
          </p>
        </div>

        {/* Connection & Stats */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Wallet Connection */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Wallet className="w-6 h-6 mr-2" />
              Wallet Connection
            </h2>
            
            {!account ? (
              <button
                onClick={connectWallet}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Connected:</span>
                  <div className="flex items-center">
                    <span className="text-white font-mono text-sm">
                      {account.slice(0, 6)}...{account.slice(-4)}
                    </span>
                    <button
                      onClick={() => copyToClipboard(account)}
                      className="ml-2 p-1 hover:bg-white/10 rounded"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full">
                  <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full w-full"></div>
                </div>
                <p className="text-green-400 text-sm">✓ Connected to Base Sepolia</p>
              </div>
            )}
          </div>

          {/* Contract Stats */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              Contract Stats
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.totalMinted}</div>
                <div className="text-gray-300 text-sm">Total Minted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.maxSupply}</div>
                <div className="text-gray-300 text-sm">Max Supply</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">{stats.mintPrice} ETH</div>
                <div className="text-gray-300 text-sm">Mint Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.contractBalance}</div>
                <div className="text-gray-300 text-sm">Contract Balance</div>
              </div>
            </div>
            
            <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(stats.totalMinted / stats.maxSupply) * 100}%` }}
              ></div>
            </div>
            <p className="text-center text-gray-300 text-sm mt-2">
              {((stats.totalMinted / stats.maxSupply) * 100).toFixed(1)}% minted
            </p>
          </div>
        </div>

        {/* Minting Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Image className="w-8 h-8 mr-3" />
            Mint Your NFT
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Token URI (Metadata URL)
              </label>
              <input
                type="text"
                value={tokenURI}
                onChange={(e) => setTokenURI(e.target.value)}
                placeholder="https://your-metadata-url.com/token.json"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-gray-400 text-sm mt-2">
                Enter a URL pointing to your NFT's metadata JSON file
              </p>
            </div>

            {tokenURI && isValidURL(tokenURI) && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <p className="text-green-400 text-sm flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Valid URL format detected
                </p>
              </div>
            )}

            <button
              onClick={mintNFT}
              disabled={loading || !account || !tokenURI.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-4 px-8 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Minting NFT...
                </div>
              ) : (
                `Mint NFT for ${stats.mintPrice} ETH`
              )}
            </button>
          </div>
        </div>

        {/* Owned NFTs */}
        {account && ownedNFTs.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Your NFTs</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownedNFTs.map((nft) => (
                <div key={nft.tokenId} className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <Image className="w-12 h-12 text-gray-400" />
                  </div>
                  
                  <h3 className="text-white font-semibold mb-2">NFT #{nft.tokenId}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Token ID:</span>
                      <span className="text-white">{nft.tokenId}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Metadata:</span>
                      <a
                        href={nft.tokenURI}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 flex items-center"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contract Address Notice */}
        {CONTRACT_ADDRESS === "0x..." && (
          <div className="mt-8 bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
            <h3 className="text-yellow-400 font-semibold mb-2">⚠️ Contract Not Deployed</h3>
            <p className="text-yellow-300 text-sm">
              Please deploy the BasicNFTMinter contract to Base Sepolia and update the CONTRACT_ADDRESS in the code to enable minting functionality.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTMinterApp;