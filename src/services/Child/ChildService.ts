import {baseURL} from '@/services/api'
import {IChildRequest} from '@/services/Child/ChildService.types'
import {IHttpClient} from '@/services/ServiceConfig.types'

export default class ChildService {
  constructor(private readonly httpClient: IHttpClient) {}

  createChild = (ChildRequest: IChildRequest) =>
    this.httpClient.post(`${baseURL}/Children`, ChildRequest)
}
