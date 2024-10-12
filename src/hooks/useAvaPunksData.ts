import { useCallback, useEffect, useState } from "react";
import useAvaPunks from "./useAvaPunks";
import { IPunksData, GetAvaDataProps } from "../interfaces";

export const getAvaData = async ({ avaPunks, _tokenId }: GetAvaDataProps) => {
  const dna = await avaPunks.methods.tokenDNA(_tokenId).call();
  const dnaToString = BigInt(dna + "").toString();
  // My bad I set the param in my contract to receive just uint8 for those methods
  const dnaForAccesoriesTypes = dnaToString.slice(-2);
  const dnaforClotheColor = dnaToString.slice(
    dnaToString.length - 4,
    dnaToString.length - 2
  );
  const [
    tokenURI,
    owner,
    accesoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyebrowType,
    facialHairColor,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    avaPunks.methods.tokenURI(_tokenId).call(),
    avaPunks.methods.ownerOf(_tokenId).call(),
    avaPunks.methods.getAccesoriesTypes(dnaForAccesoriesTypes).call(),
    avaPunks.methods.getClotheColor(dnaforClotheColor).call(),
    avaPunks.methods.getClotheType(dna).call(),
    avaPunks.methods.getEyeType(dna).call(),
    avaPunks.methods.getEyeBrowType(dna).call(),
    avaPunks.methods.getFacialHairColor(dna).call(),
    avaPunks.methods.getFacialHairType(dna).call(),
    avaPunks.methods.getHairColor(dna).call(),
    avaPunks.methods.getHatColor(dna).call(),
    avaPunks.methods.getGraphicType(dna).call(),
    avaPunks.methods.getMouthType(dna).call(),
    avaPunks.methods.getSkinColor(dna).call(),
    avaPunks.methods.getTopType(dna).call(),
  ]);
  const fetchMetaData = await fetch(tokenURI + "");
  const metadata = await fetchMetaData.json();

  return {
    _tokenId,
    tokenURI,
    dna,
    owner,
    accesoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyebrowType,
    facialHairColor,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
    metadata,
  };
};

// Plural
export const useAvaPunksData = () => {
  const [punks, setPunks] = useState<IPunksData[] | []>([]);
  const [loading, setLoading] = useState(false);

  const { avaPunks } = useAvaPunks();

  const update = useCallback(async () => {
    if (avaPunks) {
      setLoading(true);
      const totalSupply = await avaPunks.methods.totalSupply().call();
      const tokenIdArr = new Array(parseInt(totalSupply + ""))
        .fill({})
        .map((_, index) => index);
      const punkPromise = tokenIdArr.map((tokenid) =>
        getAvaData({ avaPunks, _tokenId: tokenid })
      );
      const _punks = (await Promise.all(punkPromise)) || [];
      // @ts-expect-error need to insert types for methods inside the contract
      setPunks(_punks);
      setLoading(false);
    }
  }, [avaPunks]);

  useEffect(() => {
    update();
  }, [update]);
  return {
    loading,
    punks,
    update,
  };
};

const initialState = {
  tokenURI: "",
  owner: "",
  accesoriesType: "",
  clotheColor: "",
  clotheType: "",
  eyeType: "",
  eyebrowType: "",
  facialHairColor: "",
  hairColor: "",
  hatColor: "",
  graphicType: "",
  mouthType: "",
  skinColor: "",
  topType: "",
  metadata: { description: "", name: "", image: "" },
  _tokenId: "",
  dna: "",
};

// singular
export const useAvaPunkData = (tokenId: string | number | null = null) => {
  const [punk, setPunk] = useState<IPunksData>(initialState);
  const [loading, setLoading] = useState(false);
  const { avaPunks } = useAvaPunks();

  const update = useCallback(async () => {
    if (avaPunks && tokenId != null) {
      setLoading(true);
      const _punk = await getAvaData({ _tokenId: tokenId, avaPunks });
      // @ts-expect-error Issue when the type of the methods inside the contract
      setPunk(_punk);
      setLoading(false);
    }
  }, [avaPunks, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return { punk, loading, update };
};
