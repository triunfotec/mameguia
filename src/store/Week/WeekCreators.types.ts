import {IActionStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IWeek} from '@/types/entities/Week/WeekEntity.types'
import {IWeekInitialUser} from '@/types/entities/WeekInitialUser/WeekInitialUserEntity.types'

export enum EWeekActionTypes {
  WEEK_DETAILS_REQUEST = '@week/REQUEST',
  WEEK_DETAILS_REQUEST_SUCCESS = '@week/REQUEST_SUCCESS',
  WEEK_GET_START_DATE_USER_REQUEST = '@week/GET_START_DATE_USER_REQUEST',
  WEEK_SET_INITIAL_USER = '@week/SET_INITIAL_USER',
  WEEK_SET_INITIAL_USER_REQUEST = '@week/SET_INITIAL_USER_REQUEST',
  WEEK_SET_INITIAL_USER_REQUEST_STATUS = '@week/SET_INITIAL_USER_REQUEST_STATUS',
  WEEK_DELETE_INITIAL_USER_REQUEST = '@week/DELETE_INITIAL_USER_REQUEST',
  WEEK_RESET = '@week/RESET',
  WEEK_DELETE_INITIAL_USER_REQUEST_STATUS = '@week/DELETE_INITIAL_USER_REQUEST_STATUS',
}

export interface IWeekState {
  readonly weeks: IWeek[]
  readonly weekInitialUser: IWeekInitialUser
  readonly weekStartUserStatus: IActionStatus
  readonly weekDeleteStartUserStatus: IActionStatus
}
