import { useChain, useMoralis, useNativeBalance } from 'react-moralis';
import { useContext } from 'react';
import { ContractContext } from '../../../contexts/ContractContext';
import { DEFAULT_CHAIN_HEX } from '../../../config/chainsConfig';

type Chain = 'eth' | '0x1' | 'ropsten' | '0x3' | 'rinkeby' | '0x4' | 'goerli' | '0x5' | 'kovan' | '0x2a' | 'polygon' | '0x89' | 'mumbai' | '0x13881' | 'bsc' | '0x38' | 'bsc testnet' | '0x61' | 'avalanche' | '0xa86a' | 'avalanche testnet' | '0xa869' | 'fantom' | '0xfa';

export default function Account() {
  const { chainId } = useChain();
  const { tokenBalance } = useContext(ContractContext);
  const {
    data: balance,
  } = useNativeBalance({ chain: chainId as Chain || DEFAULT_CHAIN_HEX });
  const { account } = useMoralis();

  if (!account) return null;

  return (
    <div>
      <p>
        Account:
        <b>{account}</b>
      </p>
      <p>
        Balance:&nbsp;
        <b>{balance.formatted}</b>
      </p>
      <p>
        Token Balance:
        <b>{`${tokenBalance} QUIZ` || '-'}</b>
      </p>
    </div>
  );
}
