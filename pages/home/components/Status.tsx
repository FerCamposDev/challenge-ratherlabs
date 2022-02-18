import type { Web3ReactHooks } from '@web3-react/core'

interface StatusProps {
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  error: ReturnType<Web3ReactHooks['useError']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  isDefaultChain: boolean
}

export function Status({ isActivating, error, isActive, isDefaultChain }: StatusProps) {
  return (
    <div>
      {isActivating ? (
        <>🟡 Connecting</>
      ) : isActive && !isDefaultChain ? (
        <>🟠 Connected but in other chain</>
      ) : isActive ? (
        <>🟢 Connected to Ropsten</>
      ) : error ? (
        <>🔴 {error.name ?? `Error. ${error.message}`}</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  )
}
