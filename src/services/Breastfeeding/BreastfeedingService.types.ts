import {IBreastfeed} from '@/types/entities/Breastfeed/BreastfeedEntity.types'
import {IChild} from '@/types/entities/Child/ChildEntity.types'

export interface IBreastfeedRequest {
  data: Omit<IBreastfeed, 'id'>
}

export interface IChildRequest {
  data: Omit<IChild, 'id'>
}
