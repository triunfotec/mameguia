import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'

export const resetActionStatus = {
  status: EActionTypeStatus.Waiting,
  message: '',
}

export interface IData {
  id: number
  attributes: any
}

export interface IResponse {
  data: IData[] | IData
  meta?: {}
}
