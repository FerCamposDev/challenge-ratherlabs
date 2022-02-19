import { useChain, useMoralis } from 'react-moralis';
import { formatEther } from '@ethersproject/units';
import { useContext } from 'react';
import { ContractContext } from '../../../../contexts/ContractContext';

export default function Account() {
  const { tokenBalance } = useContext(ContractContext);
  const { chain } = useChain();
  const balance = 1234;
  const { account } = useMoralis();

  if (!account) return null;

  return (
    <div>
      <p>
        Account:
        <b>{account}</b>
      </p>
      <p>
        Balance:
        <b>{formatEther(balance)}</b>
        {chain?.nativeCurrency.symbol}
      </p>
      <p>
        Token Balance:
        <b>{tokenBalance || '-'}</b>
        QUIZ
      </p>
    </div>
  );
}
