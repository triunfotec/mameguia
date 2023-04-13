import ApplicationStore from 'ApplicationStore'
import {createSelector} from 'reselect'

export const selectBreastfeeding = (state: ApplicationStore.State) =>
  state.breastfeeding

export const selectBreastfeedingChildDraft = createSelector(
  [selectBreastfeeding],
  ({childDraft}) => childDraft,
)

export const selectBreastfeedingChildCreateStatus = createSelector(
  [selectBreastfeeding],
  ({childCreateStatus}) => childCreateStatus,
)

export const selectBreastfeedingChildren = createSelector(
  [selectBreastfeeding],
  ({children}) => children,
)

export const selectBreastfeedingChildDeleteStatus = createSelector(
  [selectBreastfeeding],
  ({childDeleteStatus}) => childDeleteStatus,
)

export const selectBreastfeedingBreastfeedDraft = createSelector(
  [selectBreastfeeding],
  ({breastfeedDraft}) => breastfeedDraft,
)

export const selectBreastfeedingBreastfeedCreateStatus = createSelector(
  [selectBreastfeeding],
  ({breastfeedCreateStatus}) => breastfeedCreateStatus,
)

export const selectBreastfeedingBreastfeed = createSelector(
  [selectBreastfeeding],
  ({breastfeed}) => breastfeed,
)

export const selectBreastfeedingBreastfeedStatus = createSelector(
  [selectBreastfeeding],
  ({breastfeedGetStatus}) => breastfeedGetStatus,
)

export const selectBreastfeedingDeleteStatus = createSelector(
  [selectBreastfeeding],
  ({breastfeedDeleteStatus}) => breastfeedDeleteStatus,
)

export const selectBreastfeedingUpdateStatus = createSelector(
  [selectBreastfeeding],
  ({breastfeedUpdateStatus}) => breastfeedUpdateStatus,
)

export const selectBreastfeedingChildrenGetStatus = createSelector(
  [selectBreastfeeding],
  ({childrenGetStatus}) => childrenGetStatus,
)
