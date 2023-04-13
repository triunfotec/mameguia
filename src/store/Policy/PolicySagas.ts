import {call, put, takeLatest} from 'redux-saga/effects'

import PolicyService from '@/services/Policy/PolicyService'
import {ServiceConfig} from '@/services/ServiceConfig'
import {THttpResponse} from '@/services/ServiceConfig.types'
import {policyGetStatus, policyGetSuccess} from '@/store/Policy/PolicyCreators'
import {EPolicyActionTypes} from '@/store/Policy/PolicyCreators.types'
import {IData, IResponse} from '@/store/Store.types'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {ISagaDependenciesApplication} from '@/types/application/SagaDependencies/SagaDependenciesApplication.types'
import {IPolicy} from '@/types/entities/Policy/PolicyEntity.types'

export function* policyGetSaga(dependencies: ISagaDependenciesApplication) {
  try {
    const {getPolicy} = new PolicyService(dependencies.httpClient)

    const queryString = 'sort[0]=order%3Aasc&pagination[pageSize]=100'

    const res: THttpResponse = yield call(getPolicy, queryString)

    const {data}: IResponse = res.data || {data: [] as IData[]}

    const policyResponse: IPolicy[] = data?.map(item => ({
      id: item.id,
      ...item.attributes,
    }))

    yield put(policyGetSuccess(policyResponse))
  } catch {
    yield put(
      policyGetStatus({
        status: EActionTypeStatus.Error,
        message:
          'Houve um erro ao buscar as politicas de privacidade. Tente novamente',
      }),
    )
  }
}

export default function* () {
  yield takeLatest(EPolicyActionTypes.POLICY_GET, policyGetSaga, {
    httpClient: new ServiceConfig(),
  })
}
