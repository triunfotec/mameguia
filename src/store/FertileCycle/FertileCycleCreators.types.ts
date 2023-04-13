import {IActionStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IFertileCycle} from '@/types/entities/FertileCycle/FertileCycleEntity.types'

export enum EFertileCycleActionTypes {
  FERTILE_CYCLE_GET = '@fertileCycle/GET',
  FERTILE_CYCLE_GET_SUCCESS = '@fertileCycle/GET_SUCCESS',
  FERTILE_CYCLE_GET_STATUS = '@fertileCycle/GET_STATUS',
  FERTILE_CYCLE_CREATE = '@fertileCycle/CREATE',
  FERTILE_CYCLE_CREATE_SUCCESS = '@fertileCycle/CREATE_SUCCESS',
  FERTILE_CYCLE_CREATE_STATUS = '@fertileCycle/CREATE_STATUS',
  FERTILE_CYCLE_DELETE = '@fertileCycle/DELETE',
  FERTILE_CYCLE_DELETE_SUCCESS = '@fertileCycle/DELETE_SUCCESS',
  FERTILE_CYCLE_DELETE_STATUS = '@fertileCycle/DELETE_STATUS',
  FERTILE_CYCLE_MENSTRUATION_DATE = '@fertileCycle/MENSTRUATION_DATE',
}

export interface IFertileCycleState {
  readonly fertileCycles: IFertileCycle[]
  readonly fertileCyclesGetStatus: IActionStatus
  readonly fertileCycleCreateStatus: IActionStatus
  readonly fertileCycleDeleteStatus: IActionStatus
  readonly menstruationDateAndMenstrualCycleEntered?: Omit<
    IFertileCycle,
    'id' | 'user_id'
  >
}
