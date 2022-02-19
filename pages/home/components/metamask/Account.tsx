import { useChain, useMoralis } from 'react-moralis';
import { formatEther } from '@ethersproject/units'
import useTokenBalance from '../../../../hooks/useTokenBalance';

export function Account() {
  const { chain } = useChain();
  const balance = 1234;
  const { account } = useMoralis();
  const {tokenBalance} = useTokenBalance();

  if (account === '') return null;

  return (
    <div>
      <p>Account: <b>{account}</b></p>
      <p>Balance: <b>{formatEther(balance)}</b> {chain?.nativeCurrency.symbol}</p>
      <p>Token Balance: <b>{tokenBalance ? tokenBalance : '-'}</b> QUIZ</p>
    </div>
  )
}

/*
  const { fetchERC20Balances, data, error } = useERC20Balances();
  
useEffect(() => {
    if (account && account !== '') {
      fetchERC20Balances({
        params: {
          address: account,
          token_addresses: [surveyConfig.address],
          chain: 'ropsten',
        }
      });
    }
  }, [account]);

  useEffect(()=>{
    console.log('data', data);
  },[data]);

  useEffect(()=>{
    console.log('error', error);
  },[error]);
 */