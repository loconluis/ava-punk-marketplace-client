import { useWeb3React } from "@web3-react/core";
import { Web3 } from "web3";
import { BASE_URI_TESTNET } from "../constants";
import { useMemo } from "react";
import { AvaPunksArtifact } from "../config/artifacts/AvaPunks";

const useAvaPunks = () => {
  const w3 = useMemo(() => new Web3(BASE_URI_TESTNET), []);
  const { isActive } = useWeb3React();

  const avaPunks = useMemo(() => {
    if (isActive) {
      const ctr = new w3.eth.Contract(
        AvaPunksArtifact.abi,
        AvaPunksArtifact.address
      );
      return ctr;
    }
  }, [w3, isActive]);

  return [avaPunks];
};

export default useAvaPunks;
