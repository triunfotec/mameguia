import {IActionStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {ITerm} from '@/types/entities/Term/TermEntity.types'

export enum ETermActionTypes {
  TERM_GET = '@term/GET',
  TERM_GET_SUCCESS = '@term/GET_SUCCESS',
  TERM_GET_STATUS = '@term/GET_STATUS',
}

export interface ITermState {
  readonly terms: ITerm[]
  readonly termGetStatus: IActionStatus
}
