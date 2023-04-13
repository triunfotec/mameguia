import {baseURL} from '@/services/api'
import {IHttpClient} from '@/services/ServiceConfig.types'
import {IWeekInitialUserRequest} from '@/services/Week/WeekService.types'

export default class WeekService {
  constructor(private readonly httpClient: IHttpClient) {}

  getWeekDetails = (weekNumber: number) =>
    this.httpClient.get(
      `${baseURL}/weeks?populate[image][fields][0]=url&filters[weekNumber][$eq]=${weekNumber}&sort[0]=order`,
    )

  createWeekStartDateUser = (weekInitialUserRequest: IWeekInitialUserRequest) =>
    this.httpClient.post(`${baseURL}/week-users`, weekInitialUserRequest)

  getWeekStartDateUser = (userId: number) =>
    this.httpClient.get(`${baseURL}/week-users?filters[userId][$eq]=${userId}`)

  deleteWeekStartDateUser = (id: number) =>
    this.httpClient.delete(`${baseURL}/week-users/${id}`)
}
