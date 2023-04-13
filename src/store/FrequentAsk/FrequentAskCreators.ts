import {Reducer} from 'redux'

import produce from 'immer'

import {
  EFrequentAskActionTypes,
  IFrequentAskState,
} from '@/store/FrequentAsk/FrequentAskCreators.types'
import {resetActionStatus} from '@/store/Store.types'
import {
  EActionTypeStatus,
  IActionStatus,
} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IFrequentAsk} from '@/types/entities/FrequentAsk/FrequentAskEntity.types'

export const FREQUENT_ASK_INITIAL_STATE: IFrequentAskState = {
  frequentAsks: [],
  frequentAskGetStatus: resetActionStatus,
}

const FrequentAskReducer: Reducer<IFrequentAskState> = (
  state = FREQUENT_ASK_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case EFrequentAskActionTypes.FREQUENT_ASK_GET: {
        draft.frequentAskGetStatus = {
          status: EActionTypeStatus.Busy,
        }
        return draft
      }

      case EFrequentAskActionTypes.FREQUENT_ASK_GET_STATUS: {
        const {FrequentAsksGetStatus} = action.payload

        draft.frequentAskGetStatus = FrequentAsksGetStatus

        return draft
      }

      case EFrequentAskActionTypes.FREQUENT_ASK_GET_SUCCESS: {
        const {frequentAsk} = action.payload

        draft.frequentAsks = [...frequentAsk]

        return draft
      }

      default: {
        return draft
      }
    }
  })
}
export default FrequentAskReducer

export const frequentAskGet = () => ({
  type: EFrequentAskActionTypes.FREQUENT_ASK_GET,
})

export const frequentAskGetStatus = (frequentAsksGetStatus: IActionStatus) => ({
  type: EFrequentAskActionTypes.FREQUENT_ASK_GET_STATUS,
  payload: {frequentAsksGetStatus},
})

export const frequentAskGetSuccess = (frequentAsk: IFrequentAsk[]) => ({
  type: EFrequentAskActionTypes.FREQUENT_ASK_GET_SUCCESS,
  payload: {frequentAsk},
})
