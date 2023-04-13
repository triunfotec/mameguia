import {baseURL} from '@/services/api'
import {IHttpClient} from '@/services/ServiceConfig.types'

export default class FrequentAskService {
  constructor(private readonly httpClient: IHttpClient) {}

  getFrequentAsk = (queryString: string) =>
    this.httpClient.get(`${baseURL}/frequent-asks?${queryString}`)
}
