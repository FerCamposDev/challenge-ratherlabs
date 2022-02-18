import { ReactNode, useState } from "react";
import { createContext } from "react";
import { hooks } from "../pages/home/components/connectors/metaMask";
import { DEFAULT_CHAIN } from "../pages/utils/chains";

type UserProps = {
  isValidConnection: boolean;
  account: string;
};

const initialState: UserProps = {
  isValidConnection: false,
  account: '',
};

const UserContext = createContext(initialState);

function UserProvider({ children }: { children: ReactNode }) {
  const { useProvider, useWeb3React } = hooks;
  const provider = useProvider();
  const { account, active, chainId } = useWeb3React(provider);
  const isValidConnection = account !== '' && active && chainId === DEFAULT_CHAIN;
  
  return (
    <UserContext.Provider
      value={{
        isValidConnection,
        account: account || '',
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };