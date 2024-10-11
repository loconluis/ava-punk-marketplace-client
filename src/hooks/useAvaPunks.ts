import { useWeb3React } from "@web3-react/core";
import { Web3 } from "web3";
import { useMemo } from "react";
import { AvaPunksArtifact } from "../config/artifacts/AvaPunks";

const useAvaPunks = () => {
  const { isActive, connector } = useWeb3React();
  const w3 = useMemo(() => {
    if (isActive) {
      return new Web3(connector?.provider);
    }
  }, [connector?.provider, isActive]);

  const avaPunks = useMemo(() => {
    if (isActive && w3) {
      return new w3.eth.Contract(
        AvaPunksArtifact.abi,
        AvaPunksArtifact.address
      );
    }
  }, [w3, isActive]);

  return { avaPunks };
};

export default useAvaPunks;
