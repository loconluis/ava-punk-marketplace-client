import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { ReactNode } from "react";
import { metaMask, hooks } from "../config/connector";

interface IWebProvider {
  children?: ReactNode;
}

const connectors: [Connector, Web3ReactHooks][] = [[metaMask, hooks]];

const Web3Provider = ({ children }: IWebProvider) => {
  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
};

export default Web3Provider;
