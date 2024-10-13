import { SetStateAction, Suspense, useEffect, useState } from "react";
import { isAddress } from "web3-validator";
import { useWeb3React } from "@web3-react/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAvaPunksData } from "../hooks/useAvaPunksData";
import { Link } from "react-router-dom";
import PunkCard from "../components/PunkCard";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import SearchForm from "../components/SearchForm";

const Punks = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addressFromURI = searchParams.get("address");
  const [address, setAddress] = useState("");
  const [isValidaddress, setIsValidAddress] = useState(isAddress(""));

  const [submit, setSubmit] = useState(true);
  const { isActive } = useWeb3React();
  const { punks, loading } = useAvaPunksData({
    owner: submit && isValidaddress && address,
  });

  const handleChangeForm = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setAddress(e.target.value);
    setIsValidAddress(false);
    setSubmit(false);
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (address) {
      const flag = isAddress(address);
      setIsValidAddress(flag);
      setSubmit(true);
      if (flag) {
        navigate(`/punks?address=${address}`);
      } else {
        navigate(`/punks`);
      }
    }
  };

  useEffect(() => {
    setAddress(addressFromURI ?? "");
    setIsValidAddress(isAddress(addressFromURI ?? ""));
  }, [addressFromURI]);

  if (!isActive) return <Alert />;

  return (
    <div className=" flex justify-center items-center">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Suspense fallback={<Loader />}>
          <div>
            <SearchForm
              onSubmit={onSubmit}
              value={address ?? ""}
              onChange={handleChangeForm}
            />
            <div className="max-w-screen-xl grid grid-cols-1 md:grid md:grid-cols-4 gap-4 mt-5">
              {punks.map(({ metadata: { name, image }, _tokenId }) => {
                return (
                  <Link to={`/punks/${_tokenId}`} key={_tokenId}>
                    <PunkCard name={name} image={image} />
                  </Link>
                );
              })}
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default Punks;
