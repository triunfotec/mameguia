import {baseURL} from '@/services/api'
import {
  IBreastfeedRequest,
  IChildRequest,
} from '@/services/Breastfeeding/BreastfeedingService.types'
import {IHttpClient} from '@/services/ServiceConfig.types'
import {IBreastfeed} from '@/types/entities/Breastfeed/BreastfeedEntity.types'

export default class BreastfeedingService {
  constructor(private readonly httpClient: IHttpClient) {}

  createBreastfeed = (breastfeedRequest: IBreastfeedRequest) =>
    this.httpClient.post(`${baseURL}/breastfeedings`, breastfeedRequest)

  getBreastfeedings = (queryString: string) =>
    this.httpClient.get(`${baseURL}/breastfeedings?${queryString}`)

  deleteBreastfeed = (breastfeedId: number) =>
    this.httpClient.delete(`${baseURL}/breastfeedings/${breastfeedId}`)

  updateBreastfeed = (breastfeed: Partial<IBreastfeed>) =>
    this.httpClient.put(`${baseURL}/breastfeedings/${breastfeed.id}`, {
      data: {
        startTime: breastfeed.startTime,
        endTime: breastfeed.endTime,
      },
    })

  createChild = (childRequest: IChildRequest) =>
    this.httpClient.post(`${baseURL}/children`, childRequest)

  deleteChild = (childId: number) =>
    this.httpClient.delete(`${baseURL}/children/${childId}`)

  getChildren = (userId: number) =>
    this.httpClient.get(
      `${baseURL}/children?populate[userId][fields][0]=id&filters[userId][id][$eq]=${userId}`,
    )
}
