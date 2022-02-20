import { useChain, useMoralis } from 'react-moralis';
import { DEFAULT_CHAIN_HEX } from '../../config/chainsConfig';

export default function Status() {
  const {
    isAuthenticated,
    isAuthenticating,
    authError,
  } = useMoralis();
  const { chainId } = useChain();

  const isDefaultChain = chainId === DEFAULT_CHAIN_HEX;

  if (isAuthenticating) {
    return <>🟡 Connecting</>;
  }

  if (isAuthenticated && isDefaultChain) {
    return <>🟢 Connected to correct Network</>;
  }

  if (isAuthenticated) {
    return <>🟠 Connected but on another network</>;
  }

  if (authError) {
    return (
      <>
        🔴 Error.
        {' '}
        {authError.message}
      </>
    );
  }

  return <>⚪️ Disconnected</>;
}
