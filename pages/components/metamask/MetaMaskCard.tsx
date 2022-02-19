import { Card, CardContent } from '@mui/material';
import { useChain } from 'react-moralis';

import Account from './Account';
import Status from './Status';
import ConnectButton from './ConnectButton';

export default function MetaMaskCard() {
  const { chain } = useChain();

  return (
    <Card>
      <CardContent>
        <div>
          <b>MetaMask connection</b>
          <Status />
          <div style={{ marginBottom: '1rem' }} />
          {chain && (
            <p>
              {`Chain id: ${chain.networkId} (${chain.name})`}
            </p>
          )}
          <Account />
        </div>
        <div style={{ marginBottom: '1rem' }} />

        <ConnectButton />
      </CardContent>
    </Card>
  );
}
