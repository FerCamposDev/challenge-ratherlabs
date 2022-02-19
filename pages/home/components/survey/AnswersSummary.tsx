import { LoadingButton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { SurveyContext } from '../../../../contexts/SurveyContext';
import QuestionCard from './QuestionCard';

const AnswersSummary = () => {
  const { survey, userAnswers } = useContext(SurveyContext);
  const { questions } = survey;
  const { answers } = userAnswers;
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3} sx={{ pb: 3 }}>
      <Grid item xs={12}>
        <Typography align="center" sx={{ mt: 2, mb: 1 }}>
          All questions completed - you&apos;re finished
        </Typography>
      </Grid>
      {questions.map((question, index) => (
        <Grid item xs={12} sm={6} md={4}>
          <QuestionCard
            question={question}
            questionId={index}
            answer={answers[index]}
          />
        </Grid>
      ))}

      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <LoadingButton variant="contained">
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AnswersSummary;
