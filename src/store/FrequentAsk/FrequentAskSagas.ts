import {call, put, takeLatest} from 'redux-saga/effects'

import FrequentAskService from '@/services/FrequentAsk/FrequentAskService'
import {ServiceConfig} from '@/services/ServiceConfig'
import {THttpResponse} from '@/services/ServiceConfig.types'
import {
  frequentAskGetStatus,
  frequentAskGetSuccess,
} from '@/store/FrequentAsk/FrequentAskCreators'
import {EFrequentAskActionTypes} from '@/store/FrequentAsk/FrequentAskCreators.types'
import {IData, IResponse} from '@/store/Store.types'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {ISagaDependenciesApplication} from '@/types/application/SagaDependencies/SagaDependenciesApplication.types'
import {IFrequentAsk} from '@/types/entities/FrequentAsk/FrequentAskEntity.types'

export function* FrequentAskGetSaga(
  dependencies: ISagaDependenciesApplication,
) {
  try {
    const {getFrequentAsk} = new FrequentAskService(dependencies.httpClient)

    const queryString = 'sort[0]=order%3Aasc'

    const res: THttpResponse = yield call(getFrequentAsk, queryString)

    const {data}: IResponse = res.data || {data: [] as IData[]}

    const frequentAskResponse: IFrequentAsk[] = data?.map(item => ({
      id: item.id,
      ...item.attributes,
    }))

    yield put(frequentAskGetSuccess(frequentAskResponse))
  } catch {
    yield put(
      frequentAskGetStatus({
        status: EActionTypeStatus.Error,
        message:
          'Houve um erro ao buscar as perguntas frequentes. Tente novamente',
      }),
    )
  }
}

export default function* () {
  yield takeLatest(
    EFrequentAskActionTypes.FREQUENT_ASK_GET,
    FrequentAskGetSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )
}
