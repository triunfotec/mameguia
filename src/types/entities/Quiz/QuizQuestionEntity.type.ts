import {IQuizAnswer} from '@/types/entities/Quiz/QuizAnswerEntity.type'
import {TSituation} from '@/types/entities/Situation/SituationEntity.types'

export interface IQuizQuestion {
  id: number
  title: string
  situation: TSituation
  answers: IQuizAnswer[]
  order: number
  explanation: string
  userResponseIsCorrect?: boolean
}
