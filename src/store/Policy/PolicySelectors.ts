import ApplicationStore from 'ApplicationStore'
import {createSelector} from 'reselect'

export const selectPolicy = (state: ApplicationStore.State) => state.policy

export const selectPolicies = createSelector(
  [selectPolicy],
  ({policies}) => policies,
)

export const selectPolicyGetStatus = createSelector(
  [selectPolicy],
  ({policyGetStatus}) => policyGetStatus,
)
