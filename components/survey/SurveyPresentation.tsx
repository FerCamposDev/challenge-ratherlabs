import { useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SurveyContext } from '../../contexts/SurveyContext';
import { ContractContext } from '../../contexts/ContractContext';

export default function SurveyPresentation() {
  const { survey, setUserAnswers, userAnswers } = useContext(SurveyContext);
  const { cooldownTime, calculateCooldownTime, isCooldownTime } = useContext(ContractContext);

  const handleStart = () => {
    setUserAnswers({
      ...userAnswers,
      surveyId: survey.id,
      status: 'inProgress',
    });
  };

  useEffect(() => {
    calculateCooldownTime();
  }, [userAnswers.status]);

  return (
    <Card>
      <CardMedia
        component="img"
        height="240"
        image={survey.image}
        alt={survey.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" align="center">
          {survey.title}
        </Typography>

      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth onClick={handleStart} disabled={isCooldownTime}>
          {isCooldownTime ? `Next available at ${cooldownTime?.toLocaleTimeString()}` : 'Start'}
        </Button>
      </CardActions>
    </Card>
  );
}
