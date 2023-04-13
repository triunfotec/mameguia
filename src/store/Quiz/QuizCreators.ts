import {Reducer} from 'redux'

import produce from 'immer'

import {EQuizActionTypes, IQuizState} from '@/store/Quiz/QuizCreators.types'
import {IQuizQuestion} from '@/types/entities/Quiz/QuizQuestionEntity.type'
import {TSituation} from '@/types/entities/Situation/SituationEntity.types'

export const QUIZ_INITIAL_STATE: IQuizState = {
  questions: [],
  showAnswerModal: false,
}

const QuizReducer: Reducer<IQuizState> = (
  state = QUIZ_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case EQuizActionTypes.QUIZ_QUESTION_ANSWER_CHOSEN: {
        const {questionId, answerId} = action.payload
        draft.questions = draft.questions.map(question => {
          if (question.id === questionId) {
            let correct = false
            question.answers.map(answer => {
              if (answer.id === answerId) {
                answer.selected = true
                correct = answer.correct
              }
              return answer
            })
            question.userResponseIsCorrect = correct
          }
          return question
        })

        return draft
      }

      case EQuizActionTypes.QUIZ_REQUEST_SUCCESS: {
        const {questions} = action.payload
        draft.questions = questions.map((question: IQuizQuestion) => ({
          ...question,
          answers: question.answers.map(answer => ({
            ...answer,
            selected: false,
          })),
        }))

        return draft
      }

      case EQuizActionTypes.QUIZ_RESET: {
        draft.questions = []

        return draft
      }

      case EQuizActionTypes.QUIZ_SHOW_ANSWER_MODAL: {
        const {showAnswerModal} = action.payload
        draft.showAnswerModal = showAnswerModal

        return draft
      }

      default: {
        return draft
      }
    }
  })
}

export const quizRequest = (situation: TSituation) => ({
  type: EQuizActionTypes.QUIZ_REQUEST,
  payload: {situation},
})

export const quizRequestSuccess = (questions: IQuizQuestion[]) => ({
  type: EQuizActionTypes.QUIZ_REQUEST_SUCCESS,
  payload: {questions},
})

export const quizQuestionAnswerChosen = (
  questionId: number,
  answerId: number,
) => ({
  type: EQuizActionTypes.QUIZ_QUESTION_ANSWER_CHOSEN,
  payload: {questionId, answerId},
})

export const quizReset = () => ({
  type: EQuizActionTypes.QUIZ_RESET,
})

export const quizShowAnswerModal = (showAnswerModal: boolean) => ({
  type: EQuizActionTypes.QUIZ_SHOW_ANSWER_MODAL,
  payload: {showAnswerModal},
})

//QUIZ_SHOW_ANSWER_MODAL
export default QuizReducer
