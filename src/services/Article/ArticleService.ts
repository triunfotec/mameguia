import {baseURL} from '@/services/api'
import {IHttpClient} from '@/services/ServiceConfig.types'

export default class ArticleService {
  constructor(private readonly httpClient: IHttpClient) {}

  getArticles = (queryString: string) =>
    this.httpClient.get(`${baseURL}/articles?${queryString}`)

  getArticleItems = (queryString: string) =>
    this.httpClient.get(`${baseURL}/article-items?${queryString}`)
}
