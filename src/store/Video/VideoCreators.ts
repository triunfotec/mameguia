import {Reducer} from 'redux'

import produce from 'immer'

import {resetActionStatus} from '@/store/Store.types'
import {EVideoActionTypes, IVideoState} from '@/store/Video/VideoCreators.types'
import {
  EActionTypeStatus,
  IActionStatus,
} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TSituations} from '@/types/entities/User/UserEntity.types'
import {IVideo} from '@/types/entities/Video/VideoEntity.types'

export const VIDEO_INITIAL_STATE: IVideoState = {
  videos: [],
  videosGetStatus: resetActionStatus,
}

const VideoReducer: Reducer<IVideoState> = (
  state = VIDEO_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case EVideoActionTypes.VIDEO_REQUEST: {
        draft.videosGetStatus = {
          status: EActionTypeStatus.Busy,
        }

        return draft
      }
      case EVideoActionTypes.VIDEO_REQUEST_STATUS: {
        const {videoRequestStatus} = action.payload

        draft.videosGetStatus = videoRequestStatus

        return draft
      }

      case EVideoActionTypes.VIDEO_SET: {
        const {videos} = action.payload

        draft.videos = [...videos]

        draft.videosGetStatus = {
          status: EActionTypeStatus.Success,
          message: '',
        }

        return draft
      }

      default: {
        return draft
      }
    }
  })
}

export default VideoReducer

export const videoRequest = (situation: TSituations) => ({
  type: EVideoActionTypes.VIDEO_REQUEST,
  payload: {situation},
})

export const videoRequestStatus = (videoRequestStatus: IActionStatus) => ({
  type: EVideoActionTypes.VIDEO_REQUEST_STATUS,
  payload: {videoRequestStatus},
})

export const videoSet = (videos: IVideo[]) => ({
  type: EVideoActionTypes.VIDEO_SET,
  payload: {videos},
})
