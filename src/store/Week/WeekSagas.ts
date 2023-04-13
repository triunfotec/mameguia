import {call, put, takeLatest} from 'redux-saga/effects'

import {baseURLMain} from '@/services/api'
import {ServiceConfig} from '@/services/ServiceConfig'
import {THttpResponse} from '@/services/ServiceConfig.types'
import WeekService from '@/services/Week/WeekService'
import {IData, IResponse} from '@/store/Store.types'
import {
  weekDeleteInitialDateUserRequest,
  weekDeleteStartUserStatus,
  weekDetailsRequest,
  weekDetailsRequestSuccess,
  weekGetStartDateUser,
  weekInitialDateUserRequestStatus,
  weekSetInitialDateUser,
} from '@/store/Week/WeekCreators'
import {EWeekActionTypes} from '@/store/Week/WeekCreators.types'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {ISagaDependenciesApplication} from '@/types/application/SagaDependencies/SagaDependenciesApplication.types'

export function* WeekDetailsRequestSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof weekDetailsRequest>,
) {
  try {
    const {weekNumber} = action.payload
    const {getWeekDetails} = new WeekService(dependencies.httpClient)

    const res: THttpResponse = yield call(getWeekDetails, weekNumber)

    const {data}: IResponse = res.data || {data: [] as IData[]}

    const weekDetails = data.map((detail: any) => ({
      id: detail.id,
      ...detail.attributes,
      imageUrl: baseURLMain + detail.attributes.image.data?.attributes?.url,
    }))

    yield put(weekDetailsRequestSuccess(weekDetails))
  } catch {}
}

export function* WeekCreateStartDateUserSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof weekSetInitialDateUser>,
) {
  const {weekInitialUser} = action.payload

  try {
    const {createWeekStartDateUser} = new WeekService(dependencies.httpClient)

    const weekStartUserRequest = {
      userId: weekInitialUser.userId,
      weekNumber: weekInitialUser.weekNumber,
      weekStartDate: weekInitialUser.weekStartDate,
    }

    const res: THttpResponse = yield call(createWeekStartDateUser, {
      data: weekStartUserRequest,
    })

    const {data}: IResponse = res.data || {data: {} as IData}

    const {weekNumber, weekStartDate, userId} = data.attributes

    const weekInitialUserResponse = {
      id: data.id,
      userId,
      weekNumber,
      weekStartDate,
    }

    yield put(weekSetInitialDateUser(weekInitialUserResponse))
  } catch {
    yield put(
      weekInitialDateUserRequestStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao salvar a semana, Tente Novamente!',
      }),
    )
  }
}

export function* WeekGetWeekStartDateUserRequestSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof weekGetStartDateUser>,
) {
  // a principio so tem weekNumber 1 -> primeira semana cadastrada

  try {
    const {userId} = action.payload
    const {getWeekStartDateUser} = new WeekService(dependencies.httpClient)

    const res: THttpResponse = yield call(getWeekStartDateUser, userId)

    const {data}: IResponse = res.data || {data: [] as IData[]}

    if (data?.length === 0) {
      yield put(
        weekInitialDateUserRequestStatus({
          status: EActionTypeStatus.Success,
        }),
      )
      return
    }

    const {weekNumber, weekStartDate} = data[0].attributes

    const weekInitialUser = {
      id: data[0].id,
      userId,
      weekNumber,
      weekStartDate,
    }

    yield put(weekSetInitialDateUser(weekInitialUser))
  } catch {}
}

export function* WeekDeleteStartDateUserSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof weekDeleteInitialDateUserRequest>,
) {
  const {id} = action.payload

  try {
    const {deleteWeekStartDateUser} = new WeekService(dependencies.httpClient)

    yield call(deleteWeekStartDateUser, id)
    yield put(weekDeleteStartUserStatus({status: EActionTypeStatus.Success}))
  } catch {
    yield put(
      weekDeleteStartUserStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao deletar a semana, Tente Novamente!',
      }),
    )
  }
}

export default function* () {
  yield takeLatest(
    EWeekActionTypes.WEEK_DETAILS_REQUEST,
    WeekDetailsRequestSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )

  yield takeLatest(
    EWeekActionTypes.WEEK_SET_INITIAL_USER_REQUEST,
    WeekCreateStartDateUserSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )

  yield takeLatest(
    EWeekActionTypes.WEEK_GET_START_DATE_USER_REQUEST,
    WeekGetWeekStartDateUserRequestSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )

  yield takeLatest(
    EWeekActionTypes.WEEK_DELETE_INITIAL_USER_REQUEST,
    WeekDeleteStartDateUserSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )
}
