import ApplicationStore from 'ApplicationStore'
import {createSelector} from 'reselect'

export const selectFrequentAsk = (state: ApplicationStore.State) =>
  state.frequentAsk

export const selectFrequentAsks = createSelector(
  [selectFrequentAsk],
  ({frequentAsks}) => frequentAsks,
)

export const selectFrequentAsksSpotlight = createSelector(
  [selectFrequentAsk],
  ({frequentAsks}) => frequentAsks?.filter(ask => ask.spotlight),
)

export const selectFrequentAsksGetStatus = createSelector(
  [selectFrequentAsk],
  ({frequentAskGetStatus}) => frequentAskGetStatus,
)
