import { useEffect, useState } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { formatEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';

import surveyConfig from '../config/surveyContract';

export default function useTokenBalance() {
  const { account } = useMoralis();
  const { fetch } = useWeb3ExecuteFunction(
    {
      abi: surveyConfig.abi,
      contractAddress: surveyConfig.address,
      functionName: 'balanceOf',
      params: {
        account,
      },
    },
    { autoFetch: false },
  );

  const [tokenBalance, setTokenBalance] = useState<string>();

  const getTokenBalance = async () => {
    if (account && account !== '') {
      try {
        const balanceData = await fetch();
        const balance = formatEther(balanceData as BigNumber);
        setTokenBalance(balance);
        return balance;
      } catch (error) {
        console.log('error', error);
      }
    }
    return tokenBalance;
  };

  useEffect(() => {
    getTokenBalance();
  }, [account]);

  /*  useEffect(() => {
    if (data) {
      const balance = formatEther(data as BigNumber);
      setTokenBalance(balance);
    }
  }, [data]); */

  /* useEffect(() => {
    if (error) { console.log('error', error); }
  }, [error]); */

  return {
    tokenBalance,
    getTokenBalance,
  };
}
