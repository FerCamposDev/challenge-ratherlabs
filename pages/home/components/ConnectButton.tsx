import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { useCallback, useState } from 'react'

// material-ui
import { Button } from '@mui/material';

const ROPSTEN_ID = 3;

type ConnectProps = {
  connector: MetaMask
  chainId: ReturnType<Web3ReactHooks['useChainId']>
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  error: ReturnType<Web3ReactHooks['useError']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
};

const ConnectButton = (props: ConnectProps) => {
  const { connector, chainId, isActivating, error, isActive } = props;

  const connectChain = useCallback(
    async () => {
      await connector.activate(ROPSTEN_ID)
    },
    [connector, chainId]
  );

  const disconnectChain = useCallback(
    async () => {
      await connector.deactivate();
    },
    [connector, chainId]
  );

  return <div>
    <Button variant="contained" onClick={chainId ? disconnectChain : connectChain}>
      {chainId ? 'Disconnect' : 'Connect'}
    </Button>
    {chainId && chainId !== ROPSTEN_ID && (
      <Button variant="contained" onClick={connectChain}>
        Change to Ropsten
      </Button>
    )}
  </div>;
};

export default ConnectButton;
