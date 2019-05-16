import { GET_QUESTIONS, ADD_QUESTION, ADD_ANSWER } from "./index";
import { saveQuestion, saveAnswer } from "../utils/api";
import { handleInitialData } from "./shared";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then(question => {
      dispatch(addQuestion(question));
      dispatch(handleInitialData());
    });
  };
}

export function addAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer
  };
}

export function handleAddAnswer(info) {
  return dispatch => {
    dispatch(addAnswer(info));
    return saveAnswer(info)
      .then(() => dispatch(handleInitialData()))
      .catch(e => {
        console.warn("An error occured while saving your answer:", e);
      });
  };
}
