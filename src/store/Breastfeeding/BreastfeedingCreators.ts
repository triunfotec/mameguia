import {Reducer} from 'redux'

import produce from 'immer'

import {
  EBreastfeedingActionTypes,
  IBreastfeedingState,
} from '@/store/Breastfeeding/BreastfeedingCreators.types'
import {resetActionStatus} from '@/store/Store.types'
import {
  EActionTypeStatus,
  IActionStatus,
} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IBreastfeed} from '@/types/entities/Breastfeed/BreastfeedEntity.types'
import {IChild} from '@/types/entities/Child/ChildEntity.types'
import {getDateFormatISO} from '@/utils/formatDate'

export const BREASTFEEDING_INITIAL_STATE: IBreastfeedingState = {
  breastfeed: [],
  breastfeedCreateStatus: resetActionStatus,
  breastfeedGetStatus: resetActionStatus,
  breastfeedDeleteStatus: resetActionStatus,
  breastfeedUpdateStatus: resetActionStatus,
  children: [],
  childCreateStatus: resetActionStatus,
  childrenGetStatus: resetActionStatus,
  childDeleteStatus: resetActionStatus,
}

const BreastfeedingReducer: Reducer<IBreastfeedingState> = (
  state = BREASTFEEDING_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_CREATE_REQUEST: {
        draft.breastfeedCreateStatus = {
          status: EActionTypeStatus.Busy,
        }

        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_CREATE_REQUEST_SUCCESS: {
        const {breastfeed} = action.payload

        draft.breastfeed = [...draft.breastfeed, breastfeed]

        draft.breastfeedCreateStatus = {
          status: EActionTypeStatus.Success,
        }

        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_CREATE_REQUEST_STATUS: {
        const {breastfeedCreateRequestStatus} = action.payload

        draft.breastfeedCreateStatus = breastfeedCreateRequestStatus
        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_GET_REQUEST: {
        draft.breastfeedGetStatus = {
          status: EActionTypeStatus.Busy,
        }

        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_GET_REQUEST_SUCCESS: {
        const {breastfeedings} = action.payload

        draft.breastfeed = breastfeedings?.map((breast: IBreastfeed) => ({
          ...breast,
          groupDate: new Intl.DateTimeFormat('pt-BR').format(
            new Date(breast.startTime),
          ),
          dateFormatISO: getDateFormatISO(breast.startTime),
        }))

        draft.breastfeedGetStatus = {
          status: EActionTypeStatus.Success,
        }

        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_GET_REQUEST_STATUS: {
        const {breastfeedGetRequestStatus} = action.payload
        draft.breastfeedGetStatus = breastfeedGetRequestStatus
        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_DELETE_REQUEST: {
        draft.breastfeedDeleteStatus = {status: EActionTypeStatus.Busy}
        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_DELETE_REQUEST_STATUS: {
        const {breastfeedDeleteRequestStatus} = action.payload
        draft.breastfeedDeleteStatus = breastfeedDeleteRequestStatus
        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_UPDATE_REQUEST: {
        draft.breastfeedUpdateStatus = {status: EActionTypeStatus.Busy}
        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_UPDATE_REQUEST_STATUS: {
        const {breastfeedUpdateRequestStatus} = action.payload
        draft.breastfeedUpdateStatus = breastfeedUpdateRequestStatus
        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_UPDATE_REQUEST_SUCCESS: {
        const {breastfeed} = action.payload

        draft.breastfeed = draft.breastfeed.map(breast => {
          if (breastfeed.id === breast.id) {
            return {
              ...breast,
              ...breastfeed,
            }
          }
          return breast
        })
        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_CHILD_CREATE_REQUEST: {
        draft.childCreateStatus = {
          status: EActionTypeStatus.Busy,
        }

        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_CHILD_CREATE_REQUEST_SUCCESS: {
        const {child} = action.payload

        draft.children = [...draft.children, child]

        draft.childCreateStatus = {
          status: EActionTypeStatus.Success,
        }

        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_CHILD_CREATE_REQUEST_STATUS: {
        const {childCreateRequestStatus} = action.payload

        draft.childCreateStatus = childCreateRequestStatus
        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_CHILDREN_GET_REQUEST: {
        draft.childrenGetStatus = {
          status: EActionTypeStatus.Busy,
        }

        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_CHILDREN_GET_REQUEST_SUCCESS: {
        const {children} = action.payload

        draft.children = children

        draft.childrenGetStatus = {
          status: EActionTypeStatus.Success,
        }

        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_CHILDREN_GET_REQUEST_STATUS: {
        const {childrenGetRequestStatus} = action.payload

        draft.childrenGetStatus = childrenGetRequestStatus
        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_CHILD_SET_DRAFT: {
        const {child} = action.payload

        draft.childDraft = {...draft.childDraft, ...child}

        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_CHILD_DELETE_STATUS: {
        const {childDeleteStatus} = action.payload

        draft.childDeleteStatus = childDeleteStatus
        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_SET_DRAFT: {
        const {breastfeed} = action.payload

        draft.breastfeedDraft = {...draft.breastfeedDraft, ...breastfeed}

        return draft
      }

      case EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_DRAFT_RESET: {
        draft.breastfeedDraft = undefined

        return draft
      }
    }
  })
}

export default BreastfeedingReducer

export const breastfeedingBreastfeedCreateRequest = () => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_CREATE_REQUEST,
})

export const breastfeedingBreastfeedCreateRequestSuccess = (
  breastfeed: IBreastfeed,
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_CREATE_REQUEST_SUCCESS,
  payload: {breastfeed},
})

export const breastfeedingBreastfeedCreateRequestStatus = (
  breastfeedCreateRequestStatus: IActionStatus,
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_CREATE_REQUEST_STATUS,
  payload: {breastfeedCreateRequestStatus},
})

export const breastfeedingBreastfeedGetRequest = (childsId: number[]) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_GET_REQUEST,
  payload: {childsId},
})

export const breastfeedingBreastfeedGetRequestSuccess = (
  breastfeedings: IBreastfeed[],
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_GET_REQUEST_SUCCESS,
  payload: {breastfeedings},
})

export const breastfeedingBreastfeedGetRequestStatus = (
  breastfeedGetRequestStatus: IActionStatus,
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_GET_REQUEST_STATUS,
  payload: {breastfeedGetRequestStatus},
})

export const breastfeedingBreastfeedDeleteRequest = (breastfeedId: number) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_DELETE_REQUEST,
  payload: {breastfeedId},
})

export const breastfeedingBreastfeedUpdateRequest = (
  breastfeed: Partial<IBreastfeed>,
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_UPDATE_REQUEST,
  payload: {breastfeed},
})

export const breastfeedingBreastfeedDeleteRequestStatus = (
  breastfeedDeleteRequestStatus: IActionStatus,
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_DELETE_REQUEST_STATUS,
  payload: {breastfeedDeleteRequestStatus},
})

export const breastfeedingBreastfeedUpdateRequestStatus = (
  breastfeedUpdateRequestStatus: IActionStatus,
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_UPDATE_REQUEST_STATUS,
  payload: {breastfeedUpdateRequestStatus},
})

export const breastfeedingBreastfeedUpdateRequestSuccess = (
  breastfeed: IBreastfeed,
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_UPDATE_REQUEST_SUCCESS,
  payload: {breastfeed},
})

export const breastfeedingChildCreateRequest = () => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_CHILD_CREATE_REQUEST,
})

export const breastfeedingChildCreateRequestSuccess = (child: IChild) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_CHILD_CREATE_REQUEST_SUCCESS,
  payload: {child},
})

export const breastfeedingChildCreateRequestStatus = (
  childCreateRequestStatus: IActionStatus,
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_CHILD_CREATE_REQUEST_STATUS,
  payload: {childCreateRequestStatus},
})

export const breastfeedingChildrenGetRequest = (userId: number) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_CHILDREN_GET_REQUEST,
  payload: {userId},
})

export const breatfeedingChildrenGetRequestSuccess = (children: IChild[]) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_CHILDREN_GET_REQUEST_SUCCESS,
  payload: {children},
})

export const breastfeedingChildrenGetRequestStatus = (
  childrenGetRequestStatus: IActionStatus,
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_CHILDREN_GET_REQUEST_STATUS,
  payload: {childrenGetRequestStatus},
})

export const breastfeedingSetChildDraft = (child: Partial<IChild>) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_CHILD_SET_DRAFT,
  payload: {child},
})

export const breastfeedingChildDelete = (childId: number) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_CHILD_DELETE,
  payload: {childId},
})

export const breastfeedingChildDeleteStatus = (
  childDeleteStatus: IActionStatus,
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_CHILD_DELETE_STATUS,
  payload: {childDeleteStatus},
})

export const breastfeedingBreastfeedSetDraft = (
  breastfeed: Partial<IBreastfeed>,
) => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_SET_DRAFT,
  payload: {breastfeed},
})

export const breastfeedingBreastfeedDraftReset = () => ({
  type: EBreastfeedingActionTypes.BREASTFEEDING_BREASTFEED_DRAFT_RESET,
})
