import {call, put, takeLatest} from 'redux-saga/effects'

import {ServiceConfig} from '@/services/ServiceConfig'
import {THttpResponse} from '@/services/ServiceConfig.types'
import TermService from '@/services/Term/TermService'
import {IData, IResponse} from '@/store/Store.types'
import {termGetStatus, termGetSuccess} from '@/store/Term/TermCreators'
import {ETermActionTypes} from '@/store/Term/TermCreators.types'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {ISagaDependenciesApplication} from '@/types/application/SagaDependencies/SagaDependenciesApplication.types'
import {ITerm} from '@/types/entities/Term/TermEntity.types'

export function* termGetSaga(dependencies: ISagaDependenciesApplication) {
  try {
    const {getTerm} = new TermService(dependencies.httpClient)

    const queryString = 'sort[0]=order%3Aasc&pagination[pageSize]=100'

    const res: THttpResponse = yield call(getTerm, queryString)

    const {data}: IResponse = res.data || {data: [] as IData[]}

    const termResponse: ITerm[] = data?.map(item => ({
      id: item.id,
      ...item.attributes,
    }))

    yield put(termGetSuccess(termResponse))
  } catch {
    yield put(
      termGetStatus({
        status: EActionTypeStatus.Error,
        message:
          'Houve um erro ao buscar as politicas de privacidade. Tente novamente',
      }),
    )
  }
}

export default function* () {
  yield takeLatest(ETermActionTypes.TERM_GET, termGetSaga, {
    httpClient: new ServiceConfig(),
  })
}
