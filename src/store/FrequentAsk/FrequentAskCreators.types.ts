import {IActionStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IFrequentAsk} from '@/types/entities/FrequentAsk/FrequentAskEntity.types'

export enum EFrequentAskActionTypes {
  FREQUENT_ASK_GET = '@frequentAsk/GET',
  FREQUENT_ASK_GET_SUCCESS = '@frequentAsk/GET_SUCCESS',
  FREQUENT_ASK_GET_STATUS = '@frequentAsk/GET_STATUS',
}

export interface IFrequentAskState {
  readonly frequentAsks: IFrequentAsk[]
  readonly frequentAskGetStatus: IActionStatus
}
