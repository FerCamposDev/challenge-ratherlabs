import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { SurveyContext } from '../../../../contexts/SurveyContext';

export default function SurveyPresentation() {
  const { survey, setUserAnswers, userAnswers } = useContext(SurveyContext);

  const handleStart = () => {
    setUserAnswers({
      ...userAnswers,
      surveyId: 0, // or identifier for Survey
      status:'inProgress'
    });
  };

  return (
    <Card sx={{ maxWidth: 450 }}>
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
        <Button variant="contained" fullWidth onClick={handleStart}>
          Start
        </Button>
      </CardActions>
    </Card>
  );
}