import ApplicationStore from 'ApplicationStore'
import {createSelector} from 'reselect'
export const selectVideo = (state: ApplicationStore.State) => state.video

export const selectVideos = createSelector([selectVideo], ({videos}) => videos)

export const selectVideoRequestStatus = createSelector(
  [selectVideo],
  ({videosGetStatus}) => videosGetStatus,
)
