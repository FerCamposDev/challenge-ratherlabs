import { useEffect, useState } from 'react';
import { useChain, useMoralis, useNativeBalance } from 'react-moralis';
import { DEFAULT_CHAIN_HEX } from '../config/chainsConfig';

type Chain = 'eth' | '0x1' | 'ropsten' | '0x3' | 'rinkeby' | '0x4' | 'goerli' | '0x5' | 'kovan' | '0x2a' | 'polygon' | '0x89' | 'mumbai' | '0x13881' | 'bsc' | '0x38' | 'bsc testnet' | '0x61' | 'avalanche' | '0xa86a' | 'avalanche testnet' | '0xa869' | 'fantom' | '0xfa';

export default function useConnectionStatus() {
  const {
    isAuthenticated,
    isAuthenticating,
    authError,
    account,
  } = useMoralis();
  const { chain, chainId } = useChain();
  const {
    data: balance,
  } = useNativeBalance({ chain: chainId as Chain || DEFAULT_CHAIN_HEX });

  const isDefaultChain = chainId === DEFAULT_CHAIN_HEX;
  const [status, setStatus] = useState('Disconnected');
  const [detail, setDetail] = useState('');
  const [isCorrectConnection, setIsCorrectConnection] = useState(false);
  const [color, setColor] = useState('Gray');

  const userAddress = account ? `${account.substring(0, 6)}...${account.substring(38)}` : '';

  useEffect(() => {
    if (isAuthenticating) {
      setStatus('Connecting');
      setDetail('');
      setColor('#FFC300'); // Yellow
      setIsCorrectConnection(false);
    } else if (isAuthenticated && isDefaultChain) {
      setStatus('Connected to correct Network');
      setDetail(chain ? `${chain.name} (${chain?.networkId})` : '');
      setColor('Green');
      setIsCorrectConnection(true);
    } else if (isAuthenticated) {
      setStatus('Connected but on another network');
      setDetail(chain ? `${chain.name} (${chain?.networkId})` : '');
      setColor('#ED6F00'); // orange
      setIsCorrectConnection(false);
    } else if (authError) {
      setStatus(`Error: ${authError.code}`);
      setDetail(authError.message);
      setColor('#D30101'); // red
      setIsCorrectConnection(false);
    } else {
      setStatus('Disconnected');
      setDetail('Connect your wallet to start the survey');
      setColor('Gray');
    }
  }, [isAuthenticated, isAuthenticating, authError, isDefaultChain]);

  return {
    status,
    detail,
    color,
    userAddress,
    nativeBalance: balance,
    isCorrectConnection,
  };
}
