/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, createContext } from 'react';
import useCooldownTime from '../hooks/useCooldownTime';
import useTokenBalance from '../hooks/useTokenBalance';

type ContractProps = {
  tokenBalance: string | undefined;
  getTokenBalance: Function;
  cooldownTime: Date | undefined;
  calculateCooldownTime: Function;
  isCooldownTime: boolean;
};

const initialState: ContractProps = {
  tokenBalance: undefined,
  getTokenBalance: () => {},
  cooldownTime: undefined,
  calculateCooldownTime: () => {},
  isCooldownTime: false,
};

const ContractContext = createContext(initialState);

function ContractProvider({ children }: { children: ReactNode }) {
  const { tokenBalance, getTokenBalance } = useTokenBalance();
  const { cooldownTime, isCooldownTime, calculateCooldownTime } = useCooldownTime();

  return (
    <ContractContext.Provider
      value={{
        tokenBalance,
        getTokenBalance,
        cooldownTime,
        calculateCooldownTime,
        isCooldownTime,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export { ContractContext, ContractProvider };
