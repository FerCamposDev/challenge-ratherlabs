import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";

import { surveyConfig } from "../config/surveyContract";

export default function useSubmitAnswers() {
  const { account } = useMoralis();
  const { data, error, runContractFunction, isFetching } = useWeb3Contract({
    abi: surveyConfig.abi,
    contractAddress: surveyConfig.address,
    functionName: "submit",
    params: {
      _surveyId: 0,
      _answerIds: []
    },
  });
  const [status, setStatus] = useState({
    error: false,
    success: false
  });

  const submitAnswers = async (surveyId: number, answersIds: number[]) => {
    if (account && account !== '') {
      await runContractFunction({
        params: {
          params: {
            _surveyId: surveyId,
            _answerIds: answersIds
          },
        }
      });
    }
  };

  useEffect(() => {
    if (isFetching) {
      setStatus({ error: false, success: false });
    }
  }, [isFetching]);

  useEffect(() => {
    if (data) {
      console.log('data', data);
      setStatus({
        error: false,
        success: true
      })
    }
  }, [data]);

  useEffect(() => {
    console.log('error', error);
    if (error) {
      setStatus({
        error: true,
        success: false
      })
    }
  }, [error]);

  return {
    submitAnswers,
    error: status.error,
    success: status.success,
    isFetching
  };
};
