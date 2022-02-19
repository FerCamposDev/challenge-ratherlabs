/* eslint-disable react/require-default-props */
import { ChangeEvent, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { Question } from '../../../../types/surveyTypes';
import { SurveyContext } from '../../../../contexts/SurveyContext';

type Props = {
  question: Question;
  questionId: number;
  availableSeconds?: number;
  answer?: number;
};

function QuestionCard({
  question, questionId, availableSeconds, answer,
}: Props) {
  const { userAnswers, setUserAnswers } = useContext(SurveyContext);
  const isAnswered = answer !== undefined;

  const saveAnswer = (answerValue: number) => {
    const { answers } = userAnswers;
    answers.splice(questionId, 1, answerValue);

    setUserAnswers({
      ...userAnswers,
      answers,
    });
  };

  const handleChange = (_event: ChangeEvent<HTMLInputElement>, value: string) => {
    saveAnswer(Number(value));
  };

  return (
    <Card sx={{ minWidth: 300, maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="140"
        image={question.image}
        alt="question"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {question.text}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup onChange={handleChange} defaultValue={answer}>
            {question.options.map((option, index) => (
              <FormControlLabel
                key={question.text + option.text}
                value={index + 1}
                control={<Radio />}
                label={question.text}
                disabled={isAnswered}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
      {availableSeconds && (
        <Typography variant="subtitle1">
          Available Seconds:
          <b>{availableSeconds}</b>
        </Typography>
      )}
    </Card>
  );
}

export default QuestionCard;
