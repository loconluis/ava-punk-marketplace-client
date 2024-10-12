import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAvaPunkData } from "../hooks/useAvaPunksData";
import { useWeb3React } from "@web3-react/core";
import { isAddress } from "web3-validator";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import PunkCard from "../components/PunkCard";
import Alert from "../components/Alert";
import { formattedAddress } from "../utils";
import useAvaPunks from "../hooks/useAvaPunks";

const Details = () => {
  const { account, isActive } = useWeb3React();
  const { avaPunks } = useAvaPunks();
  const { tokenid } = useParams();
  const { loading, punk, update } = useAvaPunkData(tokenid);
  const [transferring, setTransferring] = useState(false);
  const keys = Object.keys(punk).filter(
    (key) =>
      key !== "metadata" &&
      key !== "_tokenId" &&
      key !== "tokenURI" &&
      key !== "dna" &&
      key !== "owner"
  );

  const transfer = () => {
    setTransferring(true);
    if (avaPunks) {
      const address = prompt("Ingresa la dirección:") || "";
      const validAddress = isAddress(address);
      if (!validAddress) {
        toast.error(
          "Dirección inválida. No corresponde a una dirección de Ethereum",
          {
            position: "bottom-center",
            style: {
              wordBreak: "break-all",
            },
          }
        );
        setTransferring(false);
      } else {
        avaPunks.methods
          .safeTransferFrom(punk.owner, address, punk._tokenId)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            toast("¡Transferencia enviada: " + hash + "!", {
              position: "bottom-center",
              icon: "📦",
              style: {
                wordBreak: "break-all",
              },
            });
          })
          .on("receipt", () => {
            toast(
              `¡Transferencia confirmada!. El avapunk ahora peretence a ${address}.`,
              {
                position: "bottom-center",
                icon: "✅",
                style: {
                  wordBreak: "break-all",
                },
              }
            );
            setTransferring(false);
            update();
          })
          .on("error", () => {
            toast.error("Hubo un problema en la transferencia", {
              position: "bottom-center",
              style: {
                wordBreak: "break-all",
              },
            });
            setTransferring(false);
          });
      }
    }
  };

  if (!isActive) {
    return <Alert />;
  }

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
                disabled={transferring || account !== punk.owner}
                className="flex flex-row justify-center items-center gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 enabled:focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:enabled:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-5 w-72 disabled:bg-blue-400 disabled:cursor-not-allowed "
                onClick={transfer}
              >
                {transferring ? <Loader size={5} /> : ""}
                {account !== punk.owner ? "No eres el dueño" : "Transferir"}
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
                <Toaster />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
