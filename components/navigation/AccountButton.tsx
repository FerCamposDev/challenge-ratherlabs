import React, { useEffect } from 'react';
import { useMoralis, useChain } from 'react-moralis';
import { Button, Chip, Menu } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { DEFAULT_CHAIN, DEFAULT_CHAIN_HEX } from '../../config/chainsConfig';

function AccountButton({ userAddress }: { userAddress: string }) {
  const {
    logout,
    authenticate,
    isAuthenticated,
    isAuthenticating,
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
  } = useMoralis();
  const { chainId, switchNetwork } = useChain();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const connectChain = async () => {
    if (!chainId || !isAuthenticated) {
      await authenticate({
        chainId: DEFAULT_CHAIN,
        signingMessage: 'Awesome Challenge, Hire me!',
      });
    } else {
      await switchNetwork(DEFAULT_CHAIN_HEX);
    }
  };

  const disconnectChain = async () => {
    await logout();
  };

  const init = async () => {
    if (!isWeb3Enabled && !isWeb3EnableLoading) {
      await enableWeb3();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      init();
    }
  }, [isAuthenticated]);

  return (
    <>
      {!userAddress ? (
        <LoadingButton
          variant="contained"
          onClick={isAuthenticated ? disconnectChain : connectChain}
          loading={isAuthenticating}
          fullWidth
          sx={{ borderRadius: '30px' }}
        >
          {isAuthenticated ? 'Disconnect' : 'Connect'}
        </LoadingButton>
      ) : (
        <Chip
          label={userAddress}
          variant="filled"
          color="info"
          onClick={handleClick}
          icon={<AccountCircleIcon />}
        />
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            px: 2,
            width: 230,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <LoadingButton
          variant="contained"
          onClick={isAuthenticated ? disconnectChain : connectChain}
          loading={isAuthenticating}
          fullWidth
          sx={{ mb: 1 }}
        >
          {isAuthenticated ? 'Disconnect' : 'Connect'}
        </LoadingButton>
        <Button
          variant="contained"
          onClick={connectChain}
          disabled={!(isAuthenticated && chainId && chainId !== DEFAULT_CHAIN_HEX)}
          fullWidth
        >
          Change to Ropsten
        </Button>
      </Menu>
    </>
  );
}

export default AccountButton;
