import {IActionStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IBreastfeed} from '@/types/entities/Breastfeed/BreastfeedEntity.types'
import {IChild} from '@/types/entities/Child/ChildEntity.types'

export enum EBreastfeedingActionTypes {
  BREASTFEEDING_BREASTFEED_CREATE_REQUEST = '@breastfeeding/BREASTFEED_CREATE_REQUEST',
  BREASTFEEDING_BREASTFEED_CREATE_REQUEST_SUCCESS = '@breastfeeding/BREASTFEED_CREATE_REQUEST_SUCCESS',
  BREASTFEEDING_BREASTFEED_CREATE_REQUEST_STATUS = '@breastfeeding/BREASTFEED_CREATE_REQUEST_SUCCESS_STATUS',

  BREASTFEEDING_BREASTFEED_GET_REQUEST = '@breastfeeding/BREASTFEED_GET_REQUEST',
  BREASTFEEDING_BREASTFEED_GET_REQUEST_SUCCESS = '@breastfeeding/BREASTFEED_GET_REQUEST_SUCCESS',
  BREASTFEEDING_BREASTFEED_GET_REQUEST_STATUS = '@breastfeeding/BREASTFEED_GET_REQUEST_STATUS',

  BREASTFEEDING_BREASTFEED_DELETE_REQUEST = '@breastfeeding/BREASTFEED_DELETE_REQUEST',
  BREASTFEEDING_BREASTFEED_DELETE_REQUEST_STATUS = '@breastfeeding/BREASTFEED_DELETE_REQUEST_STATUS',

  BREASTFEEDING_BREASTFEED_UPDATE_REQUEST = '@breastfeeding/BREASTFEED_UPDATE_REQUEST',
  BREASTFEEDING_BREASTFEED_UPDATE_REQUEST_SUCCESS = '@breastfeeding/BREASTFEED_UPDATE_REQUEST_SUCCESS',
  BREASTFEEDING_BREASTFEED_UPDATE_REQUEST_STATUS = '@breastfeeding/BREASTFEED_UPDATE_REQUEST_STATUS',

  BREASTFEEDING_CHILD_CREATE_REQUEST = '@breastfeeding/CHILD_CREATE_REQUEST',
  BREASTFEEDING_CHILD_CREATE_REQUEST_SUCCESS = '@breastfeeding/CHILD_CREATE_REQUEST_SUCCESS',
  BREASTFEEDING_CHILD_CREATE_REQUEST_STATUS = '@breastfeeding/CHILD_CREATE_REQUEST_STATUS',

  BREASTFEEDING_CHILDREN_GET_REQUEST = '@breastfeeding/CHILDREN_GET_REQUEST',
  BREASTFEEDING_CHILDREN_GET_REQUEST_SUCCESS = '@breastfeeding/CHILDREN_GET_REQUEST_SUCCESS ',
  BREASTFEEDING_CHILDREN_GET_REQUEST_STATUS = '@breastfeeding/CHILDREN_GET_REQUEST_STATUS ',

  BREASTFEEDING_CHILD_SET_DRAFT = '@breastfeeding/CHILD_SET_DRAFT',
  BREASTFEEDING_CHILD_DELETE = '@breastfeeding/CHILD_DELETE',
  BREASTFEEDING_CHILD_DELETE_STATUS = '@breastfeeding/CHILD_DELETE_STATUS',

  BREASTFEEDING_BREASTFEED_SET_DRAFT = '@breastfeeding/BREASTFEED_SET_DRAFT',
  BREASTFEEDING_BREASTFEED_DRAFT_RESET = '@breastfeeding/BREASTFEED_DRAFT_RESET',
}

export interface IBreastfeedingState {
  readonly breastfeed: IBreastfeed[]
  readonly breastfeedCreateStatus: IActionStatus
  readonly breastfeedGetStatus: IActionStatus
  readonly breastfeedDeleteStatus: IActionStatus
  readonly breastfeedUpdateStatus: IActionStatus
  readonly children: IChild[]
  readonly childCreateStatus: IActionStatus
  readonly childrenGetStatus: IActionStatus
  readonly childDraft?: Partial<IChild>
  readonly childDeleteStatus: IActionStatus
  readonly breastfeedDraft?: Partial<IBreastfeed>
}
