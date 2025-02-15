import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { BASE_URL } from "../default/base";

const NFTGallery = ({ refresh }) => {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState([]);
  const defaultImage = "/fallback-image.png";

  useEffect(() => {
    const fetchNFTs = async () => {
      if (isConnected && address) {
        try {
          const response = await axios.get(`${BASE_URL}/nft/gallery/${address}`);
          setNfts(response.data.data);
        } catch (error) {
          console.error("Error fetching NFTs:", error);
          return;
        }
      }
    };

    fetchNFTs();
  }, [isConnected, address, refresh]);

  return (
    <div className="text-white mt-10 w-full max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Your NFT Gallery</h2>
      {isConnected ? (
        nfts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                <img
                  src={nft.logoUrl || defaultImage}
                  alt={nft.name}
                  className="w-full h-60 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
                  <p className="text-sm text-gray-400">{nft.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-400 text-center pb-5">
            No NFTs found, please mint your first one using the widget above.
          </p>
        )
      ) : (
        <p className="mt-4 text-gray-400 text-center pb-5">Connect your wallet to see your NFTs.</p>
      )}
    </div>
  );
};

export default NFTGallery;
