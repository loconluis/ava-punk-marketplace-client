/// <reference types="vite/client" />
import { MetaMaskProvider } from "./hooks/useWeb3ToEth";

interface Window {
  ethereum?: MetaMaskProvider;
}
