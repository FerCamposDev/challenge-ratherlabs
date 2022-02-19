import { ReactNode, createContext } from "react";
import useTokenBalance from "../hooks/useTokenBalance";

type ContractProps = {
  tokenBalance: string | undefined;
  getTokenBalance: Function;
};

const initialState: ContractProps = {
  tokenBalance: undefined,
  getTokenBalance: ()=>{}
};

const ContractContext = createContext(initialState);

function ContractProvider({ children }: { children: ReactNode }) {
  const { tokenBalance, getTokenBalance } = useTokenBalance();

  return (
    <ContractContext.Provider
      value={{
        tokenBalance,
        getTokenBalance
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export { ContractContext, ContractProvider };