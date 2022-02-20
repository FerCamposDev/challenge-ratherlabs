import { useContext } from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  Grid, Typography, Toolbar, styled, Chip,
} from '@mui/material';

import { ContractContext } from '../../contexts/ContractContext';
import useConnectionStatus from '../../hooks/useConnectionsStatus';
import AccountButton from './AccountButton';
import { drawerWidth } from './NavigationBar';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 80,
  },
}));

export default function MyAppBar() {
  const { tokenBalance } = useContext(ContractContext);
  const {
    status, color, userAddress, nativeBalance, isCorrectConnection,
  } = useConnectionStatus();

  return (
    <AppBar position="fixed" sx={{ backgroundColor: color }}>
      <StyledToolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {isCorrectConnection && (
                <>
                  <Chip
                    label={nativeBalance.formatted}
                    variant="filled"
                    sx={{ bgcolor: '#979797' }}
                  />
                  <Chip
                    label={`${tokenBalance} QUIZ`}
                    variant="filled"
                    sx={{ bgcolor: '#979797', ml: 1 }}
                  />
                </>
              )}
            </Grid>
            <Grid item>
              <AccountButton userAddress={userAddress} />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ mt: 1 }}>
            <Typography variant="h6">
              {status}
            </Typography>
          </Grid>
        </Grid>
      </StyledToolbar>
    </AppBar>
  );
}
