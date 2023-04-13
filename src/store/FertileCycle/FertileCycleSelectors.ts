import ApplicationStore from 'ApplicationStore'
import {createSelector} from 'reselect'

export const selectFertileCycle = (state: ApplicationStore.State) =>
  state.fertileCycle

export const selectFertileCycles = createSelector(
  [selectFertileCycle],
  ({fertileCycles}) => fertileCycles,
)

export const selectFertileCyclesGetStatus = createSelector(
  [selectFertileCycle],
  ({fertileCyclesGetStatus}) => fertileCyclesGetStatus,
)

export const selectFertileCyclesCreateStatus = createSelector(
  [selectFertileCycle],
  ({fertileCycleCreateStatus}) => fertileCycleCreateStatus,
)

export const selectFertileCycleMenstruationDate = createSelector(
  [selectFertileCycle],
  ({menstruationDateAndMenstrualCycleEntered}) =>
    menstruationDateAndMenstrualCycleEntered,
)

export const selectFertileCyclesDeleteStatus = createSelector(
  [selectFertileCycle],
  ({fertileCycleDeleteStatus}) => fertileCycleDeleteStatus,
)
