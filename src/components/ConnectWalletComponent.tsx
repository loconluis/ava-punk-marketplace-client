import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import { formattedAddress } from '../utils';

const ConnectWalletComponent = () => {
  const [balance, setBalance] = useState<number | string>(0);
  const { connector, isActive, account, provider } = useWeb3React();

  const getBalance = useCallback(async () => {
    if (isActive && account) {
      const toSet = await provider?.getBalance(account, undefined);
      // @ts-expect-error Ts has a exception when try to parse BigInt into Integers
      setBalance(() => (parseInt(toSet) / 1e18).toFixed(3));
    }
  }, [account, isActive, provider]);

  const connect = useCallback(async () => {
    await connector.activate();
    localStorage.setItem('prevConnected', 'true');
  }, [connector]);

  const disconnect = async () => {
    await connector.deactivate?.();
    await connector.resetState();
    localStorage.removeItem('prevConnected');
  };
  useEffect(() => {
    if (localStorage.getItem('prevConnected') == 'true') {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    if (isActive) {
      getBalance();
    }
  }, [getBalance, isActive]);

  return (
    <>
      {isActive ? (
        <div className="flex flex-row gap-2 ">
          <span className="rounded-lg bg-blue-800 px-4 py-2 flex flex-row gap-1 md:gap-2 align-middle items-center justify-center">
            {account && formattedAddress(account)}
            {balance && (
              <span className="rounded bg-slate-500 text-white md:px-2 px-1">
                {balance ?? 0}
              </span>
            )}
            <span className="cursor-pointer" onClick={disconnect}>
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
