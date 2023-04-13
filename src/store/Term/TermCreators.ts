import {Reducer} from 'redux'

import produce from 'immer'

import {resetActionStatus} from '@/store/Store.types'
import {ETermActionTypes, ITermState} from '@/store/Term/TermCreators.types'
import {
  EActionTypeStatus,
  IActionStatus,
} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {ITerm} from '@/types/entities/Term/TermEntity.types'

export const TERM_INITIAL_STATE: ITermState = {
  terms: [],
  termGetStatus: resetActionStatus,
}

const TermReducer: Reducer<ITermState> = (
  state = TERM_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case ETermActionTypes.TERM_GET: {
        draft.termGetStatus = {
          status: EActionTypeStatus.Busy,
        }
        return draft
      }

      case ETermActionTypes.TERM_GET_STATUS: {
        const {termGetStatus} = action.payload

        draft.termGetStatus = termGetStatus

        return draft
      }

      case ETermActionTypes.TERM_GET_SUCCESS: {
        const {term} = action.payload

        draft.terms = [...term]

        return draft
      }

      default: {
        return draft
      }
    }
  })
}
export default TermReducer

export const termGet = () => ({
  type: ETermActionTypes.TERM_GET,
})

export const termGetStatus = (termGetStatus: IActionStatus) => ({
  type: ETermActionTypes.TERM_GET_STATUS,
  payload: {termGetStatus},
})

export const termGetSuccess = (term: ITerm[]) => ({
  type: ETermActionTypes.TERM_GET_SUCCESS,
  payload: {term},
})
