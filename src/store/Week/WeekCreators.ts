import {Reducer} from 'redux'

import produce from 'immer'

import {EWeekActionTypes, IWeekState} from '@/store/Week/WeekCreators.types'
import {
  EActionTypeStatus,
  IActionStatus,
} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IWeek} from '@/types/entities/Week/WeekEntity.types'
import {IWeekInitialUser} from '@/types/entities/WeekInitialUser/WeekInitialUserEntity.types'

export const WEEK_INITIAL_STATE: IWeekState = {
  weeks: [],
  weekInitialUser: {} as IWeekInitialUser,
  weekStartUserStatus: {
    status: EActionTypeStatus.Waiting,
    message: '',
  },
  weekDeleteStartUserStatus: {
    status: EActionTypeStatus.Waiting,
    message: '',
  },
}

const WeekReducer: Reducer<IWeekState> = (
  state = WEEK_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case EWeekActionTypes.WEEK_GET_START_DATE_USER_REQUEST: {
        draft.weekStartUserStatus = {
          status: EActionTypeStatus.Busy,
        }
        return draft
      }

      case EWeekActionTypes.WEEK_SET_INITIAL_USER_REQUEST: {
        draft.weekStartUserStatus = {
          status: EActionTypeStatus.Busy,
        }

        return draft
      }

      case EWeekActionTypes.WEEK_SET_INITIAL_USER: {
        const {weekInitialUser} = action.payload

        draft.weekInitialUser = weekInitialUser
        draft.weekStartUserStatus = {
          status: EActionTypeStatus.Success,
          message: '',
        }
        return draft
      }

      case EWeekActionTypes.WEEK_SET_INITIAL_USER_REQUEST_STATUS: {
        const {weekInitialDateUserRequestStatus} = action.payload

        draft.weekStartUserStatus = weekInitialDateUserRequestStatus

        return draft
      }

      case EWeekActionTypes.WEEK_DETAILS_REQUEST_SUCCESS: {
        const {weeks} = action.payload

        draft.weeks = weeks
        return draft
      }

      case EWeekActionTypes.WEEK_RESET: {
        draft.weekInitialUser = {} as IWeekInitialUser
        draft.weeks = []
        draft.weekStartUserStatus = {
          status: EActionTypeStatus.Waiting,
          message: '',
        }
        return draft
      }

      case EWeekActionTypes.WEEK_DELETE_INITIAL_USER_REQUEST: {
        draft.weekDeleteStartUserStatus = {
          status: EActionTypeStatus.Busy,
        }

        return draft
      }

      case EWeekActionTypes.WEEK_DELETE_INITIAL_USER_REQUEST_STATUS: {
        const {weekDeleteStartUserStatus} = action.payload
        draft.weekDeleteStartUserStatus = weekDeleteStartUserStatus

        return draft
      }

      default: {
        return draft
      }
    }
  })
}

export const weekGetStartDateUser = (userId: number) => ({
  type: EWeekActionTypes.WEEK_GET_START_DATE_USER_REQUEST,
  payload: {userId},
})

export const weekSetInitialDateUser = (weekInitialUser: IWeekInitialUser) => ({
  type: EWeekActionTypes.WEEK_SET_INITIAL_USER,
  payload: {weekInitialUser},
})

export const weekSetInitialDateUserRequest = (
  weekInitialUser: IWeekInitialUser,
) => ({
  type: EWeekActionTypes.WEEK_SET_INITIAL_USER_REQUEST,
  payload: {weekInitialUser},
})

export const weekInitialDateUserRequestStatus = (
  weekInitialDateUserRequestStatus: IActionStatus,
) => ({
  type: EWeekActionTypes.WEEK_SET_INITIAL_USER_REQUEST_STATUS,
  payload: {weekInitialDateUserRequestStatus},
})

export const weekDeleteInitialDateUserRequest = (id: number) => ({
  type: EWeekActionTypes.WEEK_DELETE_INITIAL_USER_REQUEST,
  payload: {id},
})

export const weekDetailsRequest = (weekNumber: number) => ({
  type: EWeekActionTypes.WEEK_DETAILS_REQUEST,
  payload: {weekNumber},
})

export const weekDetailsRequestSuccess = (weeks: IWeek[]) => ({
  type: EWeekActionTypes.WEEK_DETAILS_REQUEST_SUCCESS,
  payload: {weeks},
})

export const weekReset = () => ({
  type: EWeekActionTypes.WEEK_RESET,
})

export const weekDeleteStartUserStatus = (
  weekDeleteStartUserStatus: IActionStatus,
) => ({
  type: EWeekActionTypes.WEEK_DELETE_INITIAL_USER_REQUEST_STATUS,
  payload: {weekDeleteStartUserStatus},
})

export default WeekReducer
