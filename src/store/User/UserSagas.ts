import {call, put, takeLatest} from 'redux-saga/effects'

import {ServiceConfig} from '@/services/ServiceConfig'
import UserService from '@/services/User/UserService'
import {
  userDelete,
  userDeleteStatus,
  userUpdate,
  userUpdateStatus,
} from '@/store/User/UserCreators'
import {EUserActionTypes} from '@/store/User/UserCreators.types'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {ISagaDependenciesApplication} from '@/types/application/SagaDependencies/SagaDependenciesApplication.types'

export function* userUpdateSagas(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof userUpdate>,
) {
  try {
    const {user} = action.payload
    if (!user.password) {
      delete user.password
    }

    const {putUser} = new UserService(dependencies.httpClient)

    yield call(putUser, user)

    yield put(
      userUpdateStatus({
        status: EActionTypeStatus.Success,
      }),
    )
  } catch {
    yield put(
      userUpdateStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao atualizar o usuário. Tente novamente',
      }),
    )
  }
}

export function* userDeleteSagas(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof userDelete>,
) {
  try {
    const {userId} = action.payload

    const {deleteUser} = new UserService(dependencies.httpClient)

    yield call(deleteUser, userId)

    yield put(
      userDeleteStatus({
        status: EActionTypeStatus.Success,
      }),
    )
  } catch {
    yield put(
      userDeleteStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao excluir o seu usuário. Tente novamente',
      }),
    )
  }
}

export default function* () {
  yield takeLatest(EUserActionTypes.USER_UPDATE, userUpdateSagas, {
    httpClient: new ServiceConfig(),
  })

  yield takeLatest(EUserActionTypes.USER_DELETE, userDeleteSagas, {
    httpClient: new ServiceConfig(),
  })
}
