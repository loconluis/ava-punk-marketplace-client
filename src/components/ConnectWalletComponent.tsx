import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect } from "react";
import { formattedAddress } from "../utils";

const ConnectWalletComponent = () => {
  const { connector, isActive, accounts } = useWeb3React();

  const connect = useCallback(async () => {
    await connector.activate();
    localStorage.setItem("prevConnected", "true");
  }, [connector]);

  const disconnect = async () => {
    await connector.deactivate?.();
    await connector.resetState();
    localStorage.removeItem("prevConnected");
  };

  useEffect(() => {
    if (localStorage.getItem("prevConnected") == "true") {
      connect();
    }
  }, [connect]);

  return (
    <>
      {isActive ? (
        <div className="flex flex-row gap-2 ">
          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
          <span className="rounded-lg bg-blue-800 px-4 py-2 flex flex-row gap-2 align-middle items-center justify-center">
            {accounts && formattedAddress(accounts?.[0] || "")}
            <span
              className="cursor-pointer"
              // onClick={() => setIsConnected(false)}
              onClick={disconnect}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
          </span>
        </div>
      ) : (
        <div
          // onClick={() => setIsConnected(true)}
          onClick={connect}
          className="bg-black rounded-lg px-4 py-2 cursor-pointer"
        >
          Conecta tu billetera
        </div>
      )}
    </>
  );
};

export default ConnectWalletComponent;
