import {Reducer} from 'redux'

import produce from 'immer'

import {resetActionStatus} from '@/store/Store.types'
import {EUserActionTypes, IUserState} from '@/store/User/UserCreators.types'
import {
  EActionTypeStatus,
  IActionStatus,
} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IUser, TSituation} from '@/types/entities/User/UserEntity.types'

export const USER_INITIAL_STATE: IUserState = {
  userUpdateStatus: resetActionStatus,
  userDeleteStatus: resetActionStatus,
  chosenCurrentSituation: 'anotherResponsible',
  screenInitialToMenuDiary: '',
}

const UserReducer: Reducer<IUserState> = (
  state = USER_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case EUserActionTypes.USER_UPDATE: {
        draft.userUpdateStatus = {
          status: EActionTypeStatus.Busy,
        }
        return draft
      }

      case EUserActionTypes.USER_UPDATE_STATUS: {
        const {userUpdateStatus} = action.payload

        draft.userUpdateStatus = userUpdateStatus

        return draft
      }

      case EUserActionTypes.USER_DELETE: {
        draft.userDeleteStatus = {
          status: EActionTypeStatus.Busy,
        }
        return draft
      }

      case EUserActionTypes.USER_DELETE_STATUS: {
        const {userDeleteStatus} = action.payload

        draft.userDeleteStatus = userDeleteStatus

        return draft
      }

      case EUserActionTypes.USER_SET_SITUATION: {
        const {situation} = action.payload

        draft.chosenCurrentSituation = situation

        return draft
      }

      case EUserActionTypes.USER_SCREEN_INITIAL_TO_MENU_DIARY: {
        const {screenInitialToMenuDiary} = action.payload

        draft.screenInitialToMenuDiary = screenInitialToMenuDiary

        return draft
      }

      default: {
        return draft
      }
    }
  })
}
export default UserReducer

export const userUpdate = (user: Partial<IUser>) => ({
  type: EUserActionTypes.USER_UPDATE,
  payload: {user},
})

export const userUpdateStatus = (userUpdateStatus: IActionStatus) => ({
  type: EUserActionTypes.USER_UPDATE_STATUS,
  payload: {userUpdateStatus},
})

export const userDelete = (userId: number) => ({
  type: EUserActionTypes.USER_DELETE,
  payload: {userId},
})

export const userDeleteStatus = (userDeleteStatus: IActionStatus) => ({
  type: EUserActionTypes.USER_DELETE_STATUS,
  payload: {userDeleteStatus},
})

export const userSetSituation = (situation: TSituation) => ({
  type: EUserActionTypes.USER_SET_SITUATION,
  payload: {situation},
})

export const userScreenInitialToMenuDiary = (
  screenInitialToMenuDiary: string,
) => ({
  type: EUserActionTypes.USER_SCREEN_INITIAL_TO_MENU_DIARY,
  payload: {screenInitialToMenuDiary},
})
