import {ESituation} from '@/types/entities/User/UserEntity.types'

export interface IArticle {
  id: number
  title: string
  shortText: string
  spotlight: boolean
  situation: ESituation
  imageUrl: string
}
