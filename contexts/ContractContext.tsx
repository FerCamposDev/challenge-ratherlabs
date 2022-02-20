/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, createContext } from 'react';
import useCooldownTime from '../hooks/useCooldownTime';
import useTokenBalance from '../hooks/useTokenBalance';

type ContractProps = {
  tokenBalance: string | undefined;
  getTokenBalance: Function;
  cooldownTime: Date | undefined;
  calculateCooldownTime: Function;
};

const initialState: ContractProps = {
  tokenBalance: undefined,
  getTokenBalance: () => {},
  cooldownTime: undefined,
  calculateCooldownTime: () => {},
};

const ContractContext = createContext(initialState);

function ContractProvider({ children }: { children: ReactNode }) {
  const { tokenBalance, getTokenBalance } = useTokenBalance();
  const { cooldownTime, calculateCooldownTime } = useCooldownTime();

  return (
    <ContractContext.Provider
      value={{
        tokenBalance,
        getTokenBalance,
        cooldownTime,
        calculateCooldownTime,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export { ContractContext, ContractProvider };
