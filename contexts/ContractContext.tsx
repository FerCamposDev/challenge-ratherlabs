/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, createContext } from 'react';
import useCooldownTime from '../hooks/useCooldownTime';
import useTokenBalance from '../hooks/useTokenBalance';

type ContractProps = {
  tokenBalance: string | undefined;
  getTokenBalance: Function;
  cooldownTime: Date | undefined;
  refreshCooldown: Function;
  isCooldownTime: boolean;
};

const initialState: ContractProps = {
  tokenBalance: undefined,
  getTokenBalance: () => {},
  cooldownTime: undefined,
  refreshCooldown: () => {},
  isCooldownTime: false,
};

const ContractContext = createContext(initialState);

function ContractProvider({ children }: { children: ReactNode }) {
  const { tokenBalance, getTokenBalance } = useTokenBalance();
  const { cooldownTime, isCooldownTime, refreshCooldown } = useCooldownTime();

  return (
    <ContractContext.Provider
      value={{
        tokenBalance,
        getTokenBalance,
        cooldownTime,
        refreshCooldown,
        isCooldownTime,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export { ContractContext, ContractProvider };
