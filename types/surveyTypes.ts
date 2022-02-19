type Option = {
  text: string;
}

export type Question = {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: Option[];
};

export type Survey = {
  title: string;
  image: string;
  questions: Question[];
}

export type SurveyResponse = {
  surveyId: number;
  answers: number[];
  status: 'pending' | 'inProgress' | 'completed'
}