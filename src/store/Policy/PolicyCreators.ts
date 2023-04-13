import {Reducer} from 'redux'

import produce from 'immer'

import {
  EPolicyActionTypes,
  IPolicyState,
} from '@/store/Policy/PolicyCreators.types'
import {resetActionStatus} from '@/store/Store.types'
import {
  EActionTypeStatus,
  IActionStatus,
} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IPolicy} from '@/types/entities/Policy/PolicyEntity.types'

export const POLICY_INITIAL_STATE: IPolicyState = {
  policies: [],
  policyGetStatus: resetActionStatus,
}

const PolicyReducer: Reducer<IPolicyState> = (
  state = POLICY_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case EPolicyActionTypes.POLICY_GET: {
        draft.policyGetStatus = {
          status: EActionTypeStatus.Busy,
        }
        return draft
      }

      case EPolicyActionTypes.POLICY_GET_STATUS: {
        const {policyGetStatus} = action.payload

        draft.policyGetStatus = policyGetStatus

        return draft
      }

      case EPolicyActionTypes.POLICY_GET_SUCCESS: {
        const {policy} = action.payload

        draft.policies = [...policy]

        return draft
      }

      default: {
        return draft
      }
    }
  })
}
export default PolicyReducer

export const policyGet = () => ({
  type: EPolicyActionTypes.POLICY_GET,
})

export const policyGetStatus = (policyGetStatus: IActionStatus) => ({
  type: EPolicyActionTypes.POLICY_GET_STATUS,
  payload: {policyGetStatus},
})

export const policyGetSuccess = (policy: IPolicy[]) => ({
  type: EPolicyActionTypes.POLICY_GET_SUCCESS,
  payload: {policy},
})
