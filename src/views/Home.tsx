import { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import toast, { Toaster } from "react-hot-toast";
import useAvaPunks from "../hooks/useAvaPunks";
import Layout from "./_layout";

const Home = () => {
  const [imageSrc, setimageSrc] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const { isActive, account, connector } = useWeb3React();
  const { avaPunks } = useAvaPunks();

  const getAvaPunksData = useCallback(async () => {
    if (avaPunks) {
      const totalSupply = await avaPunks.methods.totalSupply().call();
      const dnaPreview = await avaPunks.methods
        .deterministicPseudRandomDNA(totalSupply, account)
        .call();
      const image: string = await avaPunks.methods
        .imageByDNA(dnaPreview)
        .call();
      setimageSrc(image);
    }
  }, [account, avaPunks]);

  const mint = useCallback(async () => {
    if (avaPunks) {
      setIsMinting(true);
      avaPunks.methods
        .mint()
        .send({ from: account })
        .on("transactionHash", (hash) => {
          toast("¡Transacción enviada: " + hash + "!", {
            position: "bottom-center",
            icon: "🚀",
            style: {
              wordBreak: "break-all",
            },
          });
        })
        .on("receipt", () => {
          toast("¡Transacción confirmada! ", {
            position: "bottom-center",
            icon: "👏🏻",
            style: {
              wordBreak: "break-all",
            },
          });
          setIsMinting(false);
        })
        .on("error", (error) => {
          toast.error("!Transacción fallida! " + error.message, {
            position: "bottom-center",
            style: {
              wordBreak: "break-all",
            },
          });
          setIsMinting(false);
        });
    }
  }, [account, avaPunks]);

  // Connect eagerly to metamask
  useEffect(() => {
    const call = async () => {
      try {
        void (await connector.connectEagerly?.());
      } catch (e) {
        console.debug("Not metamask connect", e);
      }
    };

    call();
  }, [connector]);

  useEffect(() => {
    getAvaPunksData();
  }, [getAvaPunksData]);

  return (
    <Layout>
      {
        <div>
          <div className=" flex justify-center items-center">
            <div className="max-w-screen-xl flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-4 mx-auto align-middle">
              <div
                id="project-description"
                className="text-wrap break-before-auto flex flex-col gap-5"
              >
                <h1 className="font-bold md:text-8xl underline decoration-blue-600 decoration-solid decoration-8">
                  Un Ava Punk
                </h1>
                <h3 className="md:text-6xl tracking-wide text-blue-600">
                  nunca para de aprender
                </h3>
                <div className="mt-6 tracking-wide">
                  <p className="text-xl">
                    Ava Punk es una coleccion de Avatares randomizados cuya
                    metada es almacenada on-chain. Poseen características únicas
                    y sólo hay 10000 en existencia.
                  </p>
                </div>
                <div className="mt-6 tracking-wide">
                  <p className="text-xl">
                    Cada Ava Punk se genera de forma secuencial basado en tu
                    dirección de billetera, usa el previsualizador para
                    averiguar cual seria tu Ava Punk si generas uno en este
                    momento
                  </p>
                </div>
                <div>
                  <button
                    disabled={isMinting && !avaPunks}
                    onClick={mint}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Obten tu punk
                  </button>
                  <button className="text-white hover:text-bg-blue-600 focus:ring-4  font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 me-2 mb-2  dark:hover:text-blue-600 focus:outline-none ">
                    Galeria
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <img
                  className="h-80"
                  src={isActive ? imageSrc : "https://avataaars.io/"}
                  alt="Italian Trulli"
                />
                <div className="flex flex-row justify-center mt-2 gap-5">
                  <p className="py-2">
                    <span className="bg-slate-200 px-1 rounded text-black">
                      Next ID:
                    </span>
                    <span className="ml-2 bg-blue-600 rounded px-1 text-white font-semibold">
                      1
                    </span>
                  </p>
                  <p className="py-2">
                    <span className="bg-slate-200 px-1 rounded text-black">
                      Dirección:
                    </span>
                    <span className="ml-2 bg-blue-600 rounded px-1 text-white font-semibold">
                      0000...0x12
                    </span>
                  </p>
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    onClick={getAvaPunksData}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Actualizar
                  </button>
                  <Toaster />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </Layout>
  );
};

export default Home;
