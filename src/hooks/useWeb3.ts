import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { Web3 } from "web3";

const useWeb3 = () => {
  const { connector } = useWeb3React();
  const web3 = useMemo(() => {
    return new Web3(connector?.provider);
  }, [connector?.provider]);
  return { web3 };
};

export default useWeb3;
