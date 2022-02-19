interface StatusProps {
  isActivating: boolean
  isActive: boolean
  isDefaultChain: boolean
  error: string | undefined
}

export default function Status(props: StatusProps) {
  const {
    isActivating, error, isActive, isDefaultChain,
  } = props;

  if (isActivating) {
    return <>🟡 Connecting</>;
  }

  if (isActive && !isDefaultChain) {
    return <>🟠 Connected but in other chain</>;
  }

  if (isActive) {
    return <>🟢 Connected to correct Network</>;
  }

  if (error) {
    return (
      <>
        🔴 Error.
        {' '}
        {error}
      </>
    );
  }

  return <>⚪️ Disconnected</>;
}
