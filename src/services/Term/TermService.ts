import {baseURL} from '@/services/api'
import {IHttpClient} from '@/services/ServiceConfig.types'

export default class TermService {
  constructor(private readonly httpClient: IHttpClient) {}

  getTerm = (queryString: string) =>
    this.httpClient.get(`${baseURL}/terms?${queryString}`)
}
