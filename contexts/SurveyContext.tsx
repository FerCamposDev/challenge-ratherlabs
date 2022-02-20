/* eslint-disable react/jsx-no-constructed-context-values */
import {
  ReactNode, useState, useEffect, createContext, Dispatch, SetStateAction,
} from 'react';
import { Survey, SurveyResponse } from '../types/surveyTypes';

const INITIAL_SURVEY: Survey = {
  id: 123,
  title: 'Sample Survey',
  image: 'https://48tools.com/wp-content/uploads/2015/09/shortlink.png',
  questions: [
    {
      text: 'This is the Question 1',
      image: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
      lifetimeSeconds: 10,
      options: [
        {
          text: 'Opt1',
        },
        {
          text: 'Opt2',
        },
        {
          text: 'Opt3',
        },
      ],
    },
    {
      text: 'This is the Question 2',
      image: 'https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg',
      lifetimeSeconds: 5,
      options: [
        {
          text: 'Opt1',
        },
        {
          text: 'Opt2',
        },
        {
          text: 'Opt3',
        },
      ],
    },
    {
      text: 'This is the Question 3',
      image: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
      lifetimeSeconds: 10,
      options: [
        {
          text: 'Opt1',
        },
        {
          text: 'Opt2',
        },
        {
          text: 'Opt3',
        },
      ],
    },
  ],
};

const INITIAL_ANSWER: SurveyResponse = {
  surveyId: 0,
  answers: [],
  status: 'pending',
};

type SurveyProps = {
  survey: Survey;
  userAnswers: SurveyResponse;
  setUserAnswers: Dispatch<SetStateAction<SurveyResponse>>;
  restartAnswers: Function;
};

const initialState: SurveyProps = {
  survey: INITIAL_SURVEY,
  userAnswers: INITIAL_ANSWER,
  setUserAnswers: () => { },
  restartAnswers: () => { },
};

const SurveyContext = createContext(initialState);

function SurveyProvider({ children }: { children: ReactNode }) {
  const [survey, setSurvey] = useState<Survey>(INITIAL_SURVEY);
  const [userAnswers, setUserAnswers] = useState<SurveyResponse>(INITIAL_ANSWER);

  useEffect(() => {
    // mock fetch survey
    setSurvey(INITIAL_SURVEY);
  }, []);

  const restartAnswers = () => {
    setUserAnswers(INITIAL_ANSWER);
  };

  return (
    <SurveyContext.Provider
      value={{
        survey,
        userAnswers,
        setUserAnswers,
        restartAnswers,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export { SurveyContext, SurveyProvider };
