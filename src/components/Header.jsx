import React, { useEffect } from "react";
import { Cuboid, Wallet } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected && address) {
      localStorage.setItem("walletAddress", address);
      localStorage.setItem("walletConnected", "true");
    } else {
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("walletConnected");
    }
  }, [isConnected, address]);

  return (
    <header className="w-full p-4 flex justify-between items-center bg-black text-white border-b-2 border-gray-800 shadow-2xl">
      <Cuboid className="w-6 h-6 text-purple-500 mr-2" />
      <div>
        {isConnected ? (
          <button
            onClick={() => disconnect()}
            style={{
              padding: "5px 10px",
              borderRadius: "35px",
            }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-lg transition-all duration-300 hover:from-purple-600 hover:to-pink-500">
            Disconnect
          </button>
        ) : (
          <div
            style={{
              background: "linear-gradient(to right, #ec4899, #8b5cf6)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "35px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.3s ease-in-out",
            }}>
            <Wallet className="w-4 h-4 cursor-pointer" fill="white" stroke="white" />
            <ConnectButton showBalance={false} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
