import ApplicationStore from 'ApplicationStore'
import {createSelector} from 'reselect'

export const selectUser = (state: ApplicationStore.State) => state.user

export const selectUserUpdateStatus = createSelector(
  [selectUser],
  ({userUpdateStatus}) => userUpdateStatus,
)

export const selectUserDeleteStatus = createSelector(
  [selectUser],
  ({userDeleteStatus}) => userDeleteStatus,
)

export const selectUserChosenCurrentSituation = createSelector(
  [selectUser],
  ({chosenCurrentSituation}) => chosenCurrentSituation,
)

export const selectUserScreenInitialToMenuDiary = createSelector(
  [selectUser],
  ({screenInitialToMenuDiary}) => screenInitialToMenuDiary,
)
