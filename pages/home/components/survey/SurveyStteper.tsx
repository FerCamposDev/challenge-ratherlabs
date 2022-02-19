import { useContext, useEffect, useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Grid } from '@mui/material';

import { SurveyContext } from '../../../../contexts/SurveyContext';
import QuestionCard from './QuestionCard';
import useCountDown from '../../../../hooks/useCountDown';
import AnswersSummary from './AnswersSummary';

export default function SurveyStepper() {
  const { survey, userAnswers, setUserAnswers } = useContext(SurveyContext);
  const [activeStep, setActiveStep] = useState(0);
  const steps = survey.questions;
  const activeQuestion = activeStep !== steps.length ? steps[activeStep] : undefined;
  const { count } = useCountDown(activeQuestion?.lifetimeSeconds);
  
    useEffect(() => {
      if (count === 0 && activeStep !== steps.length) {
        handleNext();
      }
    }, [count]);

  const saveAnswer = () => {
    const { answers } = userAnswers;
    if (answers[activeStep] === undefined) {
      answers.splice(activeStep, 1, 0);
      setUserAnswers({
        ...userAnswers,
        answers
      });
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    saveAnswer();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" align="center" paragraph>
        {survey.title}
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((question, index) => {
          return (
            <Step key={question.text}>
              <StepLabel />
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <AnswersSummary />
      ) : (
        <>
          <Grid container justifyContent="center" sx={{ p: 2 }}>
            {activeQuestion && (
              <QuestionCard
                key={activeQuestion.text}
                question={activeQuestion}
                questionId={activeStep}
                availableSeconds={count}
              />
            )}
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}