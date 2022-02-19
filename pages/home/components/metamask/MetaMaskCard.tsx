import { Card, CardContent } from '@mui/material';
import { useChain, useMoralis } from 'react-moralis';

import Account from './Account';
import Status from './Status';
import ConnectButton from './ConnectButton';

import { DEFAULT_CHAIN_HEX } from '../../../../config/chainsConfig';

export default function MetaMaskCard() {
  const {
    isAuthenticated,
    isAuthenticating,
    authError,
  } = useMoralis();
  const { chainId, chain } = useChain();

  return (
    <Card>
      <CardContent>
        <div>
          <b>MetaMask connection</b>
          <Status
            isActivating={isAuthenticating}
            error={authError?.message}
            isActive={isAuthenticated}
            isDefaultChain={chainId === DEFAULT_CHAIN_HEX}
          />
          <div style={{ marginBottom: '1rem' }} />
          {chain && (
            <p>
              {`Chain id: ${chain.networkId} (${chain.name})`}
            </p>
          )}
          {isAuthenticated && <Account />}
        </div>
        <div style={{ marginBottom: '1rem' }} />

        <ConnectButton />
      </CardContent>
    </Card>
  );
}
