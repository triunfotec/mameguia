import {call, put, takeEvery} from 'redux-saga/effects'

import QuizService from '@/services/Quiz/QuizService'
import {ServiceConfig} from '@/services/ServiceConfig'
import {THttpResponse} from '@/services/ServiceConfig.types'
import {quizRequest, quizRequestSuccess} from '@/store/Quiz/QuizCreators'
import {ISagaDependenciesApplication} from '@/types/application/SagaDependencies/SagaDependenciesApplication.types'

import {EQuizActionTypes} from './QuizCreators.types'

export function* quizRequestSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof quizRequest>,
) {
  const {situation} = action.payload

  try {
    const {find} = new QuizService(dependencies.httpClient)

    const res: THttpResponse = yield call(find, situation)

    const {data} = res.data || {data: []}

    const questions = data.map((question: any) => ({
      id: question.id,
      ...question.attributes,
    }))

    yield put(quizRequestSuccess(questions))
  } catch {}
}

export default function* () {
  yield takeEvery(EQuizActionTypes.QUIZ_REQUEST, quizRequestSaga, {
    httpClient: new ServiceConfig(),
  })
}
