import { Contract, ContractAbi } from "web3";

interface Metadata {
  name: string;
  description: string;
  image: string;
}

export interface IPunksData {
  tokenURI: string;
  owner: string;
  accesoriesType: string;
  clotheColor: string;
  clotheType: string;
  eyeType: string;
  eyebrowType: string;
  facialHairColor: string;
  hairColor: string;
  hatColor: string;
  graphicType: string;
  mouthType: string;
  skinColor: string;
  topType: string;
  metadata: Metadata;
  _tokenId: string;
  dna: string | bigint;
}

export interface GetAvaDataProps {
  avaPunks: Contract<ContractAbi>;
  _tokenId: number | string;
}
