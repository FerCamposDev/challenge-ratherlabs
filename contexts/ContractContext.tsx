import dynamic from "next/dynamic";
import { ReactNode, useState, useEffect, createContext } from "react";
import { Contract } from 'ethers';
import { utils } from 'ethers';
/* import { formatEther } from "@ethersproject/units"; */

import { hooks } from "../pages/home/components/connectors/metaMask";

import { DEFAULT_CHAIN } from "../pages/utils/chains";
import { surveyConfig } from "../config/surveyContract";

type ContractProps = {
  surveyContract: Contract | undefined;
};

const initialState: ContractProps = {
  surveyContract: undefined,
};

const ContractContext = createContext(initialState);

function ContractProvider({ children }: { children: ReactNode }) {
  const { useProvider, useWeb3React } = hooks;
  const provider = useProvider();
  const { account, active, chainId } = useWeb3React(provider);
  const [surveyContract, setSurveyContract] = useState<Contract>();

  const loadContract = async () => {
    const surveyInterface = new utils.Interface(surveyConfig.abi);
    const contract = new Contract(surveyConfig.address, surveyInterface, provider);
    const totalSupply  = await contract.totalSupply();
    /* const supply = formatEther(totalSupply)
    console.log('supply', supply); */

    setSurveyContract(contract);
  };

  useEffect(() => {
    if (account !== '' && active && chainId === DEFAULT_CHAIN) {
      loadContract();
    } else {
      setSurveyContract(undefined);
    }
  }, [account, active, chainId]);

  return (
    <ContractContext.Provider
      value={{
        surveyContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export { ContractContext, ContractProvider };