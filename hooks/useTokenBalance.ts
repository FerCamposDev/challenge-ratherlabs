import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { formatEther } from "@ethersproject/units";
import { BigNumber } from "ethers";

import { surveyConfig } from "../config/surveyContract";

export default function useTokenBalance() {
  const { account } = useMoralis();
  const { data, error, fetch } = useWeb3ExecuteFunction(
    {
      abi: surveyConfig.abi,
      contractAddress: surveyConfig.address,
      functionName: "balanceOf",
      params: {
        //account: '0x63b30e1a8b1454c25b1a7d6e50274a5d996c1648',
        account,
      },
    },
    { autoFetch: false }
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
};
