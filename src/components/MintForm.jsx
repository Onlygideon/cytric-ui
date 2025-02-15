import React, { useState } from "react";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { Cuboid } from "lucide-react";
import { sepolia } from "viem/chains";
import bigInt from "big-integer";
import axios from "axios";
import { CONTRACT_ABI, BASE_URL, CONTRACT_ADDRESS } from "../default/base";
import MintSuccess from "./MintSuccess";

const MintForm = ({ onMintSuccess }) => {
  const [nft, setNft] = useState({ name: "", description: "", imageUrl: "", metadataUrl: "" });
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [minted, setMinted] = useState(false);

  const publicClient = usePublicClient();

  const generateUniqueId = async () => {
    let tokenId;
    let exists = true;

    while (exists) {
      tokenId = Math.floor(Math.random() * 1000000);
      const tokenExist = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "checkId",
        args: [bigInt(tokenId)],
      });

      exists = tokenExist;
    }

    return tokenId;
  };

  const storeMetadata = async (metadata, tokenId) => {
    try {
      await axios.post(`${BASE_URL}/nft/store`, metadata);
      return `${BASE_URL}/nft/${tokenId}`;
    } catch (error) {
      console.error("Failed to store metadata", error);
      throw new Error("Metadata storage failed");
    }
  };

  const mintNFT = async () => {
    if (!nft.name || !nft.description || !nft.imageUrl) return;

    setLoading(true);

    try {
      if (!walletClient) throw new Error("Wallet not connected");

      if (!isConnected) {
        alert("Connect Wallet To Mint NFTs");
      }

      const tokenId = await generateUniqueId();

      const metadataUrl = await storeMetadata(
        {
          name: nft.name,
          description: nft.description,
          logoUrl: nft.imageUrl,
          nftId: tokenId,
          userWalletAddress: address,
        },
        tokenId
      );

      nft.metadataUrl = metadataUrl;

      await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "mint",
        args: [tokenId, metadataUrl],
        chain: sepolia,
      });

      alert(`NFT minted successfully!`);
      setMinted(true);
      onMintSuccess();
    } catch (error) {
      console.log(error);
      if (error.message === "Wallet not connected") {
        alert("Wallet not connected");
      } else {
        alert("Minting failed. Try again later!!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (minted) {
    return <MintSuccess nft={nft} onReset={() => setMinted(false)} />;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md mx-auto text-white border-4 border-gray-800 shadow-2xl">
      <h2 className="text-xl font-bold">Mint Your NFT</h2>
      <input
        type="text"
        placeholder="Enter NFT name"
        className="w-full p-2 mt-3 bg-gray-800 rounded"
        required
        onChange={(e) => setNft({ ...nft, name: e.target.value })}
      />
      <textarea
        placeholder="Describe your NFT"
        className="w-full p-2 mt-3 bg-gray-800 rounded resize-none h-24"
        required
        onChange={(e) => setNft({ ...nft, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Enter Image URL"
        className="w-full p-2 mt-3 bg-gray-800 rounded"
        required
        onChange={(e) => setNft({ ...nft, imageUrl: e.target.value })}
      />
      <button
        className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:from-purple-600 hover:to-pink-500"
        onClick={mintNFT}
        disabled={loading}>
        <Cuboid className="w-4 h-4" stroke="white" />
        {loading ? "Minting..." : "Mint NFT"}
      </button>
    </div>
  );
};

export default MintForm;
