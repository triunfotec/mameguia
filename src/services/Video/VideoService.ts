import { baseURL } from '@/services/api'
import { IHttpClient } from '@/services/ServiceConfig.types'

export default class ArticleService {
  constructor(private readonly httpClient: IHttpClient) {}

  getVideos = (queryString: string) =>
    this.httpClient.get(`${baseURL}/videos?${queryString}`)
}
