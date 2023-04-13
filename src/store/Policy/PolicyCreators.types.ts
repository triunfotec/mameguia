import {IActionStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IPolicy} from '@/types/entities/Policy/PolicyEntity.types'

export enum EPolicyActionTypes {
  POLICY_GET = '@policy/GET',
  POLICY_GET_SUCCESS = '@policy/GET_SUCCESS',
  POLICY_GET_STATUS = '@policy/GET_STATUS',
}

export interface IPolicyState {
  readonly policies: IPolicy[]
  readonly policyGetStatus: IActionStatus
}
