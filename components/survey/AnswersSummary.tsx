import { useContext, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';

import { SurveyContext } from '../../contexts/SurveyContext';

import useSubmitAnswers from '../../hooks/useSubmitAnswers';
import QuestionCard from './QuestionCard';
import { ContractContext } from '../../contexts/ContractContext';

function AnswersSummary() {
  const { survey, userAnswers, restartAnswers } = useContext(SurveyContext);
  const { tokenBalance, getTokenBalance } = useContext(ContractContext);
  const { questions } = survey;
  const {
    submitAnswers, error, success, isFetching,
  } = useSubmitAnswers();

  const handleSubmit = async () => {
    await submitAnswers(userAnswers.surveyId, userAnswers.answers);
  };

  useEffect(() => {
    let intervalBalance: any;
    if (success) {
      let prevTokenBalance = tokenBalance;

      intervalBalance = setInterval(async () => {
        prevTokenBalance = tokenBalance;
        const actualTokenBalance = await getTokenBalance();
        if (prevTokenBalance !== actualTokenBalance) {
          clearInterval(intervalBalance);
          restartAnswers();
        }
      }, 5000);
    }

    return () => { clearInterval(intervalBalance); };
  }, [success]);

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3} sx={{ pb: 3 }}>
      <Grid item xs={12}>
        <Typography align="center" sx={{ mt: 2, mb: 1 }}>
          All questions completed - you&apos;re finished
        </Typography>
      </Grid>
      {questions.map((question, index) => (
        <Grid item xs={12} sm={6} md={4} key={question.text}>
          <QuestionCard
            question={question}
            questionId={index}
            answer={userAnswers.answers[index]}
          />
        </Grid>
      ))}

      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <LoadingButton
            variant="contained"
            onClick={handleSubmit}
            loading={isFetching}
            disabled={success}
          >
            Submit
          </LoadingButton>
          <Grid item xs={12} sx={{ p: 2 }}>
            {success && (
              <Typography variant="body1" align="center" sx={{ color: 'green' }}>
                The transaction was executed successfully.
                <br />
                Your tokens will be updated in a few seconds
              </Typography>
            )}
            {error && (
              <Typography variant="body1" align="center" sx={{ color: 'red' }}>
                An error occurred in the transaction
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AnswersSummary;
