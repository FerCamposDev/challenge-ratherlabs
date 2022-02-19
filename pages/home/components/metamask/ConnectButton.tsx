import { useCallback } from 'react';

// material-ui
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useMoralis, useChain } from 'react-moralis';
import { DEFAULT_CHAIN, DEFAULT_CHAIN_HEX } from '../../../../config/chainsConfig';

function ConnectButton() {
  const {
    authenticate,
    logout,
    isAuthenticated,
    isAuthenticating,
  } = useMoralis();
  const { chainId, switchNetwork } = useChain();

  const connectChain = useCallback(
    async () => {
      if (!chainId || chainId === '') {
        await authenticate({
          chainId: DEFAULT_CHAIN,
          signingMessage: 'Awesome Challenge',
        });
      } else {
        await switchNetwork(DEFAULT_CHAIN_HEX);
      }
    },
    [chainId],
  );

  const disconnectChain = useCallback(
    async () => {
      await logout();
    },
    [],
  );

  return (
    <div>
      <LoadingButton
        variant="contained"
        onClick={isAuthenticated ? disconnectChain : connectChain}
        loading={isAuthenticating}
      >
        {isAuthenticated ? 'Disconnect' : 'Connect'}
      </LoadingButton>
      {isAuthenticated && chainId !== DEFAULT_CHAIN_HEX && (
      <Button variant="contained" onClick={connectChain}>
        Change to Ropsten
      </Button>
      )}
    </div>
  );
}

export default ConnectButton;
