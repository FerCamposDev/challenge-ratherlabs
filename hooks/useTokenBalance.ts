import { useEffect, useState } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { formatEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';

import { surveyConfig } from '../config/surveyContract';

export default function useTokenBalance() {
  const { account } = useMoralis();
  const { data, error, fetch } = useWeb3ExecuteFunction(
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
      await fetch();
    }
  };

  useEffect(() => {
    getTokenBalance();
  }, [account]);

  useEffect(() => {
    if (data) {
      const balance = formatEther(data as BigNumber);
      setTokenBalance(balance);
    }
  }, [data]);

  useEffect(() => {
    console.log('error', error);
  }, [error]);

  return {
    tokenBalance,
    getTokenBalance,
  };
}
