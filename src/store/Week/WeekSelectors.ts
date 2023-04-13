import ApplicationStore from 'ApplicationStore'
import {createSelector} from 'reselect'

export const selectWeek = (state: ApplicationStore.State) => state.week

export const selectWeeks = createSelector([selectWeek], ({weeks}) => weeks)

export const selectWeekStartDateUser = createSelector(
  [selectWeek],
  ({weekInitialUser}) => weekInitialUser,
)

export const selectWeekStartDateUserStatus = createSelector(
  [selectWeek],
  ({weekStartUserStatus}) => weekStartUserStatus,
)

export const selectWeekDeleteStartDateUserStatus = createSelector(
  [selectWeek],
  ({weekDeleteStartUserStatus}) => weekDeleteStartUserStatus,
)
