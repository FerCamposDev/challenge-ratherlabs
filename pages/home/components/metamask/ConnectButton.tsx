import { useCallback, useEffect } from 'react';
import { useMoralis, useChain } from 'react-moralis';
import { Button, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { DEFAULT_CHAIN, DEFAULT_CHAIN_HEX } from '../../../../config/chainsConfig';

function ConnectButton() {
  const {
    authenticate, logout, isAuthenticated, isAuthenticating, Moralis,
  } = useMoralis();
  const { chainId, switchNetwork } = useChain();

  const connectChain = useCallback(
    async () => {
      if (!chainId || !isAuthenticated) {
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

  useEffect(() => {
    if (isAuthenticated) {
      Moralis.enableWeb3();
    }
  }, [isAuthenticated]);

  return (
    <Grid container justifyContent="space-between">
      <LoadingButton
        variant="contained"
        onClick={isAuthenticated ? disconnectChain : connectChain}
        loading={isAuthenticating}
      >
        {isAuthenticated ? 'Disconnect' : 'Connect'}
      </LoadingButton>
      {isAuthenticated && chainId && chainId !== DEFAULT_CHAIN_HEX && (
        <Button variant="contained" onClick={connectChain}>
          Change to Ropsten
        </Button>
      )}
    </Grid>
  );
}

export default ConnectButton;
