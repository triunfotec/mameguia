import {IFertileCycle} from '@/types/entities/FertileCycle/FertileCycleEntity.types'

export interface IFertileCyclePost {
  data: Omit<IFertileCycle, 'id'>
}
