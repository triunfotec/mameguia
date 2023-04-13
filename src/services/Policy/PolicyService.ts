import {baseURL} from '@/services/api'
import {IHttpClient} from '@/services/ServiceConfig.types'

export default class PolicyService {
  constructor(private readonly httpClient: IHttpClient) {}

  getPolicy = (queryString: string) =>
    this.httpClient.get(`${baseURL}/policies?${queryString}`)
}
