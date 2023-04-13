import {call, put, takeLatest, select} from 'redux-saga/effects'

import BreastfeedingService from '@/services/Breastfeeding/BreastfeedingService'
import {ServiceConfig} from '@/services/ServiceConfig'
import {THttpResponse} from '@/services/ServiceConfig.types'
import {
  breastfeedingBreastfeedCreateRequest,
  breastfeedingBreastfeedCreateRequestStatus,
  breastfeedingBreastfeedCreateRequestSuccess,
  breastfeedingBreastfeedGetRequest,
  breastfeedingBreastfeedGetRequestSuccess,
  breastfeedingBreastfeedDeleteRequest,
  breastfeedingBreastfeedUpdateRequest,
  breastfeedingChildCreateRequest,
  breastfeedingChildCreateRequestStatus,
  breastfeedingChildCreateRequestSuccess,
  breastfeedingChildDelete,
  breastfeedingChildDeleteStatus,
  breastfeedingChildrenGetRequest,
  breastfeedingChildrenGetRequestStatus,
  breatfeedingChildrenGetRequestSuccess,
  breastfeedingBreastfeedDeleteRequestStatus,
  breastfeedingBreastfeedUpdateRequestStatus,
  breastfeedingBreastfeedUpdateRequestSuccess,
} from '@/store/Breastfeeding/BreastfeedingCreators'
import {EBreastfeedingActionTypes} from '@/store/Breastfeeding/BreastfeedingCreators.types'
import {
  selectBreastfeedingBreastfeedDraft,
  selectBreastfeedingChildDraft,
} from '@/store/Breastfeeding/BreastfeedingSelectors'
import {IData, IResponse} from '@/store/Store.types'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {ISagaDependenciesApplication} from '@/types/application/SagaDependencies/SagaDependenciesApplication.types'
import {IBreastfeed} from '@/types/entities/Breastfeed/BreastfeedEntity.types'
import {IChild} from '@/types/entities/Child/ChildEntity.types'

export function* BreastfeedingCreateBreastfeedRequestSaga(
  dependencies: ISagaDependenciesApplication,
) {
  try {
    const breastfeedDraft: IBreastfeed = yield select(
      selectBreastfeedingBreastfeedDraft,
    )
    const {createBreastfeed} = new BreastfeedingService(dependencies.httpClient)

    yield call(createBreastfeed, {
      data: breastfeedDraft,
    })

    yield put(
      breastfeedingBreastfeedCreateRequestStatus({
        status: EActionTypeStatus.Success,
      }),
    )
  } catch {
    yield put(
      breastfeedingBreastfeedCreateRequestStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao salvar amamentação. Tente novamente',
      }),
    )
  }
}

export function* BreastfeedingGetBreastfeedRequestSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof breastfeedingBreastfeedGetRequest>,
) {
  try {
    const {childsId} = action.payload

    const {getBreastfeedings} = new BreastfeedingService(
      dependencies.httpClient,
    )

    let filters = ''

    childsId.forEach((childId, index) => {
      filters += `filters[childId][id][$in][${index}]=${childId}&`
    })
    const queryString = `populate[childId][fields][0]=name&${filters}sort[0]=startTime%3Adesc`

    const res: THttpResponse = yield call(getBreastfeedings, queryString)

    const {data}: IResponse = res.data || {data: [] as IData[]}

    const breastfeedingResponse = data?.map(item => ({
      id: item.id,
      ...item.attributes,
      childId: item.attributes.childId.data.id,
      childName: item.attributes.childId.data.attributes.name,
    }))

    yield put(breastfeedingBreastfeedGetRequestSuccess(breastfeedingResponse))
  } catch {
    yield put(
      breastfeedingBreastfeedCreateRequestStatus({
        status: EActionTypeStatus.Error,
        message:
          'Houve um erro ao buscar as amamentações salvas. Tente novamente',
      }),
    )
  }
}

export function* BreastfeedingCreateChildRequestSaga(
  dependencies: ISagaDependenciesApplication,
) {
  try {
    const {createChild} = new BreastfeedingService(dependencies.httpClient)

    const childDraft: Omit<IChild, 'id'> = yield select(
      selectBreastfeedingChildDraft,
    )

    const res: THttpResponse = yield call(createChild, {
      data: childDraft,
    })

    const {data}: IResponse = res.data || {data: {} as IData}
    const {
      wasBorn,
      name,
      genre,
      ageMonths,
      typeFood,
      quantityMillilitersSupplementation,
      minutesSupplementation,
    } = data.attributes

    const childResponse: IChild = {
      id: data.id,
      userId: childDraft.userId,
      wasBorn,
      name,
      genre,
      ageMonths,
      typeFood,
      quantityMillilitersSupplementation,
      minutesSupplementation,
    }

    yield put(breastfeedingChildCreateRequestSuccess(childResponse))
  } catch {
    yield put(
      breastfeedingChildCreateRequestStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao salvar a criança. Tente novamente',
      }),
    )
  }
}

export function* BreastfeedingGetChildrenRequestSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof breastfeedingChildrenGetRequest>,
) {
  try {
    const {userId} = action.payload

    const {getChildren} = new BreastfeedingService(dependencies.httpClient)

    const res: THttpResponse = yield call(getChildren, userId)

    const {data}: IResponse = res.data || {data: [] as IData[]}

    const childrenResponse = data.map(item => ({
      id: item.id,
      ...item.attributes,
    }))

    yield put(breatfeedingChildrenGetRequestSuccess(childrenResponse))
  } catch {
    yield put(
      breastfeedingChildrenGetRequestStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao buscar as crianças salvas. Tente novamente',
      }),
    )
  }
}

export function* BreastfeedingChildDeleteSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof breastfeedingChildDelete>,
) {
  try {
    const {childId} = action.payload

    const {deleteChild} = new BreastfeedingService(dependencies.httpClient)

    yield call(deleteChild, childId)

    yield put(
      breastfeedingChildDeleteStatus({
        status: EActionTypeStatus.Success,
      }),
    )
  } catch {
    yield put(
      breastfeedingChildDeleteStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao excluir a criança. Tente novamente',
      }),
    )
  }
}

export function* BreastfeedingBreastfeedDeleteSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof breastfeedingBreastfeedDeleteRequest>,
) {
  try {
    const {breastfeedId} = action.payload

    const {deleteBreastfeed} = new BreastfeedingService(dependencies.httpClient)

    yield call(deleteBreastfeed, breastfeedId)

    yield put(
      breastfeedingBreastfeedDeleteRequestStatus({
        status: EActionTypeStatus.Success,
      }),
    )
  } catch {
    yield put(
      breastfeedingBreastfeedDeleteRequestStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao excluir a amamentação. Tente novamente',
      }),
    )
  }
}
export function* BreastfeedingBreastfeedUpdateSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof breastfeedingBreastfeedUpdateRequest>,
) {
  try {
    const {breastfeed} = action.payload

    const {updateBreastfeed} = new BreastfeedingService(dependencies.httpClient)

    const res: THttpResponse = yield call(updateBreastfeed, breastfeed)

    const {data}: IResponse = res.data || {data: {} as IData}

    const breastfeedResponse: IBreastfeed = {
      id: data.id,
      ...data.attributes,
    }

    yield put(breastfeedingBreastfeedUpdateRequestSuccess(breastfeedResponse))

    yield put(
      breastfeedingBreastfeedUpdateRequestStatus({
        status: EActionTypeStatus.Success,
      }),
    )
  } catch {
    yield put(
      breastfeedingBreastfeedUpdateRequestStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao editar a amamentação. Tente novamente',
      }),
    )
  }
}

export default function* () {
  yield takeLatest(
    EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_CREATE_REQUEST,
    BreastfeedingCreateBreastfeedRequestSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )
  yield takeLatest(
    EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_GET_REQUEST,
    BreastfeedingGetBreastfeedRequestSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )
  yield takeLatest(
    EBreastfeedingActionTypes.BREASTFEEDING_CHILD_CREATE_REQUEST,
    BreastfeedingCreateChildRequestSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )
  yield takeLatest(
    EBreastfeedingActionTypes.BREASTFEEDING_CHILDREN_GET_REQUEST,
    BreastfeedingGetChildrenRequestSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )
  yield takeLatest(
    EBreastfeedingActionTypes.BREASTFEEDING_CHILD_DELETE,
    BreastfeedingChildDeleteSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )
  yield takeLatest(
    EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_DELETE_REQUEST,
    BreastfeedingBreastfeedDeleteSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )
  yield takeLatest(
    EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_UPDATE_REQUEST,
    BreastfeedingBreastfeedUpdateSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )
}
