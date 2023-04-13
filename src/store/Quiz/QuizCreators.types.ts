import {IQuizQuestion} from '@/types/entities/Quiz/QuizQuestionEntity.type'

export enum EQuizActionTypes {
  QUIZ_REQUEST = '@quiz/REQUEST',
  QUIZ_REQUEST_SUCCESS = '@quiz/REQUEST_SUCCESS',
  QUIZ_QUESTION_ANSWER_CHOSEN = '@quiz/QUESTION_ANSWER_CHOSEN',
  QUIZ_RESET = '@quiz/RESET',

  QUIZ_SHOW_ANSWER_MODAL = '@quiz/SHOW_ANSWER_MODAL',
}

export interface IQuizState {
  readonly questions: IQuizQuestion[]
  readonly showAnswerModal: boolean
}
