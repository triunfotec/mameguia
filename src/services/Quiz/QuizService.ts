import {baseURL} from '@/services/api'
import {IHttpClient} from '@/services/ServiceConfig.types'
import {TSituation} from '@/types/entities/Situation/SituationEntity.types'

export default class QuizService {
  constructor(private readonly httpClient: IHttpClient) {}

  find = (situation: TSituation) =>
    this.httpClient.get(
      `${baseURL}/questions?filters[situation][$eq]=${situation}&sort[0]=order`,
    )
}
