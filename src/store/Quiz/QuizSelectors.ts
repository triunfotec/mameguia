import ApplicationStore from 'ApplicationStore'
import {createSelector} from 'reselect'

import {IQuizQuestion} from '@/types/entities/Quiz/QuizQuestionEntity.type'

export const selectQuiz = (state: ApplicationStore.State) => state.quiz

export const selectQuestions =
  createSelector([selectQuiz], ({questions}) => questions) ||
  ([] as IQuizQuestion[])

export const selectShowAnswerModal = createSelector(
  [selectQuiz],
  ({showAnswerModal}) => showAnswerModal,
)

export const selectQuestion = (questionId: number) =>
  createSelector([selectQuestions], questions =>
    questions.find(question => question.id === questionId),
  ) || ({} as IQuizQuestion)
