/// <reference types="vite/client" />
import { MetaMaskProvider } from "./config/web3";

interface Window {
  ethereum?: MetaMaskProvider;
}
