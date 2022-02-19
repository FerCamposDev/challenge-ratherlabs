import { AuthError } from "react-moralis";

interface StatusProps {
  isActivating: boolean
  isActive: boolean
  isDefaultChain: boolean
  error?: string
}

export function Status({ isActivating, error, isActive, isDefaultChain }: StatusProps) {
  return (
    <div>
      {isActivating ? (
        <>🟡 Connecting</>
      ) : isActive && !isDefaultChain ? (
        <>🟠 Connected but in other chain</>
      ) : isActive ? (
        <>🟢 Connected to correct Network</>
      ) : error ? (
        <>🔴 {error ?? `Error. ${error}`}</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  )
}
