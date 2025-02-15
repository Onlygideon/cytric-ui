import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";
import { getDefaultConfig, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MintForm from "./components/MintForm";
import NFTGallery from "./components/NftGallery";

const customTheme = {
  ...lightTheme(),
  colors: {
    connectButtonBackground: "#ec4899",
    connectButtonText: "white",
    modalBackground: "white",
  },
};

const config = getDefaultConfig({
  appName: "Cytric NFT",
  projectId: "064d19c84f272315cb8c66f97350cf1b",
  chains: [sepolia],
});

const queryClient = new QueryClient();

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleMintSuccess = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen  text-white">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={customTheme}>
            <div className="min-h-screen bg-gradient-to-r from-black via-[#111827] to-[#1f2937] text-white">
              <Header />
              <Hero />
              <MintForm onMintSuccess={handleMintSuccess} />
              <NFTGallery refresh={refresh} />
            </div>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default App;
