import { useEffect, useState } from "react";
import { Web3, MetaMaskProvider } from "web3";

export type { MetaMaskProvider };

export const useWeb3ToEth = () => {
  const [w3, setW3] = useState<Web3 | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const _web3 = new Web3();
      setW3(_web3);
    }
  }, []);

  return { w3 };
};
