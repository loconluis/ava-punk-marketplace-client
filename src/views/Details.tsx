import { useParams } from "react-router-dom";
import { useAvaPunkData } from "../hooks/useAvaPunksData";
import Loader from "../components/Loader";
import PunkCard from "../components/PunkCard";
import { formattedAddress } from "../utils";
import { useWeb3React } from "@web3-react/core";

const Details = () => {
  const { account } = useWeb3React();
  const { tokenid } = useParams();
  const { loading, punk } = useAvaPunkData(tokenid);
  const keys = Object.keys(punk).filter(
    (key) =>
      key !== "metadata" &&
      key !== "_tokenId" &&
      key !== "tokenURI" &&
      key !== "dna" &&
      key !== "owner"
  );
  return (
    <div className="flex justify-center items-center my-10">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-5">
          <div className="md:col-span-1">
            <div className="flex flex-col justify-center items-center">
              <PunkCard image={punk.metadata.image} name={punk.metadata.name} />
              <button
                disabled={account !== punk.owner}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-5 w-72"
              >
                Transferir
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-col">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {punk.metadata.name}
                </h2>
                <p className="text-lg mb-5">{punk.metadata.description}</p>
                <p className="break-all mb-2">
                  <span className="font-semibold pr-2">ADN:</span>
                  <span className="ml-2 bg-blue-600 rounded px-1 text-white font-semibold">
                    {BigInt(punk.dna).toString()}
                  </span>
                </p>
                <p>
                  <span>Dueño:</span>
                  <span className="ml-2 bg-blue-600 rounded px-1 text-white font-semibold">
                    {formattedAddress(punk.owner)}
                  </span>
                </p>
              </div>
              <span className="mt-5 border border-b border-slate-500" />
              <div className="md:grid md:grid-cols-2 pt-5 gap-0">
                <div className="flex flex-col gap-4">
                  <span className="font-semibold border-b border-b-gray-800 pb-1">
                    Atributos
                  </span>
                  {keys.map((key, index) => (
                    <span
                      key={index}
                      className="border-b border-b-gray-800 pb-1"
                    >
                      {key}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <span className="font-semibold border-b border-b-gray-800 pb-1">
                    Valor
                  </span>
                  {keys.map((key, index) => (
                    <span
                      key={index}
                      className="border-b border-b-gray-800 pb-1"
                    >
                      {/*@ts-expect-error it is possible to use this way but an error with the linter */}
                      {punk[key]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
