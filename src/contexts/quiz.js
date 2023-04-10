import { createContext, useReducer } from 'react';
import { normalizeQuestions, shuffleAnswers } from '../helpers';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  showResults: false,
  answers: [],
  currentAnswer: '',
  correctAnswersCount: 0,
  isAnswered: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_ANSWER': {
      const correctAnswer = state.questions[state.currentQuestionIndex].correctAnswer;
      const correctAnswersCount = action.payload === correctAnswer ? state.correctAnswersCount + 1 : state.correctAnswersCount
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount,
        isAnswered: true,
      };
    }
    case 'NEXT_QUESTION': {
      const showResults = state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults ? state.currentQuestionIndex : state.currentQuestionIndex + 1
      const answers = showResults ? [] : shuffleAnswers(state.questions[currentQuestionIndex])
      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: '',
        isAnswered: false,
      }
    }
    case 'RESTART': {
      return initialState;
    }
    case 'LOADED_QUESTIONS': {
      const normalizedQuestions = normalizeQuestions(action.payload)
      return {
        ...state,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0]),
      }
    }
    default: {
      return state;
    }
  }
}

export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
  const value = useReducer(reducer, initialState)
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}