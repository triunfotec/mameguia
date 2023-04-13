import {Reducer} from 'redux'

import produce from 'immer'

import {
  EFertileCycleActionTypes,
  IFertileCycleState,
} from '@/store/FertileCycle/FertileCycleCreators.types'
import {resetActionStatus} from '@/store/Store.types'
import {
  EActionTypeStatus,
  IActionStatus,
} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IFertileCycle} from '@/types/entities/FertileCycle/FertileCycleEntity.types'

export const FERTILE_CYCLE_INITIAL_STATE: IFertileCycleState = {
  fertileCycles: [],
  fertileCyclesGetStatus: resetActionStatus,
  fertileCycleCreateStatus: resetActionStatus,
  menstruationDateAndMenstrualCycleEntered: undefined,
  fertileCycleDeleteStatus: resetActionStatus,
}

const FertileCycleReducer: Reducer<IFertileCycleState> = (
  state = FERTILE_CYCLE_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case EFertileCycleActionTypes.FERTILE_CYCLE_GET: {
        draft.fertileCyclesGetStatus = {
          status: EActionTypeStatus.Busy,
        }
        return draft
      }

      case EFertileCycleActionTypes.FERTILE_CYCLE_GET_STATUS: {
        const {fertileCyclesGetStatus} = action.payload

        draft.fertileCyclesGetStatus = fertileCyclesGetStatus

        return draft
      }

      case EFertileCycleActionTypes.FERTILE_CYCLE_GET_SUCCESS: {
        const {fertileCycles} = action.payload

        draft.fertileCycles = [...fertileCycles]
        draft.fertileCyclesGetStatus = {
          status: EActionTypeStatus.Success,
        }

        return draft
      }

      case EFertileCycleActionTypes.FERTILE_CYCLE_CREATE: {
        draft.fertileCycleCreateStatus = {
          status: EActionTypeStatus.Busy,
        }
        return draft
      }

      case EFertileCycleActionTypes.FERTILE_CYCLE_CREATE_STATUS: {
        const {fertileCycleCreateStatus} = action.payload

        draft.fertileCycleCreateStatus = fertileCycleCreateStatus

        return draft
      }

      case EFertileCycleActionTypes.FERTILE_CYCLE_MENSTRUATION_DATE: {
        const {menstruationDateAndMenstrualCycle} = action.payload

        draft.menstruationDateAndMenstrualCycleEntered =
          menstruationDateAndMenstrualCycle

        return draft
      }

      case EFertileCycleActionTypes.FERTILE_CYCLE_DELETE: {
        draft.fertileCycleDeleteStatus = {
          status: EActionTypeStatus.Busy,
        }

        return draft
      }

      case EFertileCycleActionTypes.FERTILE_CYCLE_DELETE_STATUS: {
        const {fertileCycleDeleteStatus} = action.payload

        draft.fertileCycleDeleteStatus = fertileCycleDeleteStatus

        return draft
      }

      default: {
        return draft
      }
    }
  })
}
export default FertileCycleReducer

export const fertileCycleGet = (userId: number) => ({
  type: EFertileCycleActionTypes.FERTILE_CYCLE_GET,
  payload: {userId},
})

export const fertileCycleGetStatus = (
  fertileCyclesGetStatus: IActionStatus,
) => ({
  type: EFertileCycleActionTypes.FERTILE_CYCLE_GET_STATUS,
  payload: {fertileCyclesGetStatus},
})

export const fertileCycleGetSuccess = (fertileCycles: IFertileCycle[]) => ({
  type: EFertileCycleActionTypes.FERTILE_CYCLE_GET_SUCCESS,
  payload: {fertileCycles},
})

export const fertileCycleCreate = (
  fertileCycle: Omit<IFertileCycle, 'id'>,
) => ({
  type: EFertileCycleActionTypes.FERTILE_CYCLE_CREATE,
  payload: {fertileCycle},
})

export const fertileCycleCreateStatus = (
  fertileCycleCreateStatus: IActionStatus,
) => ({
  type: EFertileCycleActionTypes.FERTILE_CYCLE_CREATE_STATUS,
  payload: {fertileCycleCreateStatus},
})

export const fertileCycleMenstruationDate = (
  menstruationDateAndMenstrualCycle: Omit<IFertileCycle, 'id' | 'user_id'>,
) => ({
  type: EFertileCycleActionTypes.FERTILE_CYCLE_MENSTRUATION_DATE,
  payload: {menstruationDateAndMenstrualCycle},
})

export const fertileCycleDelete = (fertileCycleId: number) => ({
  type: EFertileCycleActionTypes.FERTILE_CYCLE_DELETE,
  payload: {fertileCycleId},
})

export const fertileCycleDeleteStatus = (
  fertileCycleDeleteStatus: IActionStatus,
) => ({
  type: EFertileCycleActionTypes.FERTILE_CYCLE_DELETE_STATUS,
  payload: {fertileCycleDeleteStatus},
})
