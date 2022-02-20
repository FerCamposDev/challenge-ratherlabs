import { useEffect, useState } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { BigNumber } from 'ethers';
import Web3 from 'web3';
import surveyConfig from '../config/surveyContract';

export default function useCooldownTime() {
  const { account } = useMoralis();
  const {
    data: cooldownSecondsData, error: cooldownSecondsError, fetch: fetchCooldownSeconds,
  } = useWeb3ExecuteFunction({
    abi: surveyConfig.abi,
    contractAddress: surveyConfig.address,
    functionName: 'cooldownSeconds',
  });
  const {
    data: lastSubmittalData, error: lastSubmittalError, fetch: lastSubmittalFetch,
  } = useWeb3ExecuteFunction(
    {
      abi: surveyConfig.abi,
      contractAddress: surveyConfig.address,
      functionName: 'lastSubmittal',
    },
    { autoFetch: false },
  );

  const [cooldownSeconds, setCooldownSeconds] = useState<number>();
  const [lastSubmittal, setLastSubmittal] = useState<number>();
  const [cooldownTime, setCooldownTime] = useState<Date>();
  const [isCooldownTime, setIsCooldownTime] = useState(false);

  const calculateCooldownTime = async () => {
    if (cooldownSeconds && lastSubmittal) {
      const timestamp = cooldownSeconds + lastSubmittal;
      const cooldownTimeCalculated = new Date(timestamp * 1000);
      setCooldownTime(cooldownTimeCalculated);
      setIsCooldownTime(new Date().getTime() < cooldownTimeCalculated.getTime());
    }
  };

  useEffect(() => {
    calculateCooldownTime();
  }, [cooldownSeconds, lastSubmittal]);

  useEffect(() => {
    if (cooldownTime && isCooldownTime) {
      const actualCooldownMilliSeconds = (cooldownTime.getTime() - new Date().getTime());
      // console.log('actualCooldownMilliSeconds', actualCooldownMilliSeconds / 1000); // in seconds

      setTimeout(() => {
        setIsCooldownTime(false);
      }, actualCooldownMilliSeconds + 5000);
    }
  }, [cooldownTime, isCooldownTime]);

  useEffect(() => {
    if (account) {
      fetchCooldownSeconds();
      lastSubmittalFetch({
        params: {
          params: {
            '': account,
          },
        },
      });
    }
  }, [account]);

  useEffect(() => {
    if (cooldownSecondsData) {
      // eslint-disable-next-line no-underscore-dangle
      const cooldown = Web3.utils.hexToNumber((cooldownSecondsData as BigNumber)._hex);
      setCooldownSeconds(cooldown);
    }
  }, [cooldownSecondsData]);

  useEffect(() => {
    if (lastSubmittalData) {
      // eslint-disable-next-line no-underscore-dangle
      const lastSubmit = Web3.utils.hexToNumber((lastSubmittalData as BigNumber)._hex);
      setLastSubmittal(lastSubmit);
    }
  }, [lastSubmittalData]);

  useEffect(() => {
    if (cooldownSecondsError) {
      console.log('cooldownSecondsError', cooldownSecondsError);
    }
    if (lastSubmittalError) {
      console.log('lastSubmittalError', lastSubmittalError);
    }
  }, [cooldownSecondsError, lastSubmittalError]);

  return {
    cooldownTime,
    calculateCooldownTime,
    isCooldownTime,
  };
}
