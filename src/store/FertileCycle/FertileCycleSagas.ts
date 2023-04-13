import {call, put, takeLatest} from 'redux-saga/effects'

import FertileCycleService from '@/services/FertileCycle/FertileCycleService'
import {ServiceConfig} from '@/services/ServiceConfig'
import {THttpResponse} from '@/services/ServiceConfig.types'
import {
  fertileCycleCreate,
  fertileCycleCreateStatus,
  fertileCycleDelete,
  fertileCycleDeleteStatus,
  fertileCycleGet,
  fertileCycleGetStatus,
  fertileCycleGetSuccess,
} from '@/store/FertileCycle/FertileCycleCreators'
import {EFertileCycleActionTypes} from '@/store/FertileCycle/FertileCycleCreators.types'
import {IData, IResponse} from '@/store/Store.types'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {ISagaDependenciesApplication} from '@/types/application/SagaDependencies/SagaDependenciesApplication.types'
import {IFertileCycle} from '@/types/entities/FertileCycle/FertileCycleEntity.types'

export function* FertileCycleGetSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof fertileCycleGet>,
) {
  try {
    const {userId} = action.payload

    const {getFertileCycles} = new FertileCycleService(dependencies.httpClient)

    const queryString = `populate[user_id][fields]=id&filters[user_id][id][$eq]=${userId}&sort[0]=menstruationDate%3Adesc`

    const res: THttpResponse = yield call(getFertileCycles, queryString)

    const {data}: IResponse = res.data || {data: [] as IData[]}

    const fertileCyclesResponse: IFertileCycle[] = data?.map(item => ({
      id: item.id,
      ...item.attributes,
      user_id: item.attributes.user_id.data.id,
    }))

    yield put(fertileCycleGetSuccess(fertileCyclesResponse))
  } catch {
    yield put(
      fertileCycleGetStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao buscar os ciclos férteis. Tente novamente',
      }),
    )
  }
}

export function* FertileCycleCreateSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof fertileCycleCreate>,
) {
  try {
    const {fertileCycle} = action.payload

    const {postFertileCycle} = new FertileCycleService(dependencies.httpClient)

    yield call(postFertileCycle, {
      data: fertileCycle,
    })

    yield put(
      fertileCycleCreateStatus({
        status: EActionTypeStatus.Success,
      }),
    )
  } catch {
    yield put(
      fertileCycleCreateStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao salvar o ciclo fértil. Tente novamente',
      }),
    )
  }
}

export function* FertileCycleDeleteSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof fertileCycleDelete>,
) {
  const {fertileCycleId} = action.payload

  try {
    const {deleteFertileCycle} = new FertileCycleService(
      dependencies.httpClient,
    )

    yield call(deleteFertileCycle, fertileCycleId)
    yield put(
      fertileCycleDeleteStatus({
        status: EActionTypeStatus.Success,
      }),
    )
  } catch {
    yield put(
      fertileCycleDeleteStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao deletar o ciclo fértil, Tente Novamente!',
      }),
    )
  }
}

export default function* () {
  yield takeLatest(
    EFertileCycleActionTypes.FERTILE_CYCLE_GET,
    FertileCycleGetSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )

  yield takeLatest(
    EFertileCycleActionTypes.FERTILE_CYCLE_CREATE,
    FertileCycleCreateSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )

  yield takeLatest(
    EFertileCycleActionTypes.FERTILE_CYCLE_DELETE,
    FertileCycleDeleteSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )
}
