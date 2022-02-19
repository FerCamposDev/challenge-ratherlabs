import { useContext } from "react";
import { SurveyContext } from "../../../../contexts/SurveyContext";

import SurveyPresentation from "./SurveyPresentation";
import SurveyStepper from "./SurveyStteper";

const Survey = () => {
  const { userAnswers } = useContext(SurveyContext);

  if(userAnswers.status === 'pending'){
    return <SurveyPresentation />
  }
  
  return <SurveyStepper />;
}

export default Survey;
