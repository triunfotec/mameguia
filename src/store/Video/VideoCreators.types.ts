import {IActionStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IVideo} from '@/types/entities/Video/VideoEntity.types'

export enum EVideoActionTypes {
  VIDEO_REQUEST = '@video/REQUEST',
  VIDEO_REQUEST_STATUS = '@video/REQUEST_STATUS',
  VIDEO_SET = '@video/SET',
}
export interface IVideoState {
  readonly videos: IVideo[]
  readonly videosGetStatus: IActionStatus
}
