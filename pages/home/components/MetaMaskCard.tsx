import { hooks, metaMask } from './connectors/metaMask'
import { Accounts } from './Accounts'
import { Status } from './Status'
import { Card, CardContent } from '@mui/material'
import ConnectButton from './ConnectButton'
import { CHAINS, DEFAULT_CHAIN } from '../../utils/chains'

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function MetaMaskCard() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  return (
    <Card>
      <CardContent>
        <div>
          <b>MetaMask connection</b>
          <Status
            isActivating={isActivating}
            error={error}
            isActive={isActive}
            isDefaultChain={chainId === DEFAULT_CHAIN}
          />
          <div style={{ marginBottom: '1rem' }} />
          {chainId && <p>Chain id {chainId}</p>}
          <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
        </div>
        <div style={{ marginBottom: '1rem' }} />

        <ConnectButton
          connector={metaMask}
          chainId={chainId}
          isActivating={isActivating}
          error={error}
          isActive={isActive}
        />
      </CardContent>
    </Card>
  )
}