import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useConnectionStatus from '../../hooks/useConnectionsStatus';

export default function StatusCard() {
  const {
    status, detail,
  } = useConnectionStatus();

  return (
    <Card sx={{ minWidth: 350, p: 3 }}>
      <CardContent>
        <Typography variant="h5" paragraph>
          {status}
        </Typography>
        <Typography variant="body2" align="center">
          {detail}
        </Typography>
      </CardContent>
    </Card>
  );
}
