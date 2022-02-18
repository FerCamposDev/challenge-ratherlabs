import { useState } from "react";


export default function useSurveyContract(){
  
  const [tokenBalance, setTokenBalance] = useState(0);

  const getTokenBalance = () => {

  }

  const loadContract = async ()=> {

  };

  return {
    tokenBalance,
    getTokenBalance
  };
};
