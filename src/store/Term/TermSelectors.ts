import ApplicationStore from 'ApplicationStore'
import {createSelector} from 'reselect'

export const selectTerm = (state: ApplicationStore.State) => state.term

export const selectTermPrivacy = createSelector(
  [selectTerm],
  ({terms}) => terms,
)

export const selectTermGetStatus = createSelector(
  [selectTerm],
  ({termGetStatus}) => termGetStatus,
)
