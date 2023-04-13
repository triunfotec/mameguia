import {baseURL} from '@/services/api'
import {IFertileCyclePost} from '@/services/fertileCycle/FertileCycleService.types'
import {IHttpClient} from '@/services/ServiceConfig.types'

export default class FertileCycleService {
  constructor(private readonly httpClient: IHttpClient) {}

  getFertileCycles = (queryString: string) =>
    this.httpClient.get(`${baseURL}/fertile-cycles?${queryString}`)

  postFertileCycle = (fertileCycle: IFertileCyclePost) =>
    this.httpClient.post(`${baseURL}/fertile-cycles`, fertileCycle)

  deleteFertileCycle = (id: number) =>
    this.httpClient.delete(`${baseURL}/fertile-cycles/${id}`)
}
