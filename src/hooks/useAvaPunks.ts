import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { AvaPunksArtifact } from "../config/artifacts/AvaPunks";
import useWeb3 from "./useWeb3";

const useAvaPunks = () => {
  const { isActive } = useWeb3React();
  const { web3 } = useWeb3();

  const avaPunks = useMemo(() => {
    if (isActive && web3) {
      return new web3.eth.Contract(
        AvaPunksArtifact.abi,
        AvaPunksArtifact.address
      );
    }
  }, [isActive, web3]);

  return { avaPunks };
};

export default useAvaPunks;
