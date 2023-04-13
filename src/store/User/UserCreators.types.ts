import {IActionStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TSituation} from '@/types/entities/User/UserEntity.types'

export enum EUserActionTypes {
  USER_UPDATE = '@user/UPDATE',
  USER_UPDATE_STATUS = '@user/UPDATE_STATUS',

  USER_DELETE = '@user/DELETE',
  USER_DELETE_STATUS = '@user/DELETE_STATUS',

  USER_SET_SITUATION = '@user/SET_SITUATION',
  USER_SCREEN_INITIAL_TO_MENU_DIARY = '@user/SCREEN_INITIAL_TO_MENU_DIARY',
}

export interface IUserState {
  readonly userUpdateStatus: IActionStatus
  readonly userDeleteStatus: IActionStatus
  readonly chosenCurrentSituation: TSituation
  readonly screenInitialToMenuDiary: string
}
