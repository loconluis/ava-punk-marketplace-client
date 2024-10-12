import PunkCard from "../components/PunkCard";
import Loader from "../components/Loader";
import { useWeb3React } from "@web3-react/core";
import { useAvaPunksData } from "../hooks/useAvaPunksData";
import Alert from "../components/Alert";

const Punks = () => {
  const { isActive } = useWeb3React();
  const { punks, loading } = useAvaPunksData();

  if (!isActive) return <Alert />;

  return (
    <div className=" flex justify-center items-center my-10">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="max-w-screen-xl grid grid-cols-1 md:grid md:grid-cols-4 gap-4">
          {punks.map(({ metadata: { name, image }, _tokenId }) => {
            return <PunkCard name={name} image={image} key={_tokenId} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Punks;
