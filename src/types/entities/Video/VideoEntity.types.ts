import {TSituations} from '@/types/entities/User/UserEntity.types'

export interface IVideo {
  id: number
  title: string
  text: string
  duration: string
  videoId: string
  coverImagem: string
  situation: TSituations
}
