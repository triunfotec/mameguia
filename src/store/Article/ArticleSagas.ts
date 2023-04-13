import {call, put, takeLatest} from 'redux-saga/effects'

import {baseURLMain} from '@/services/api'
import ArticleService from '@/services/Article/ArticleService'
import {ServiceConfig} from '@/services/ServiceConfig'
import {THttpResponse} from '@/services/ServiceConfig.types'
import {
  articleItemsGetRequestStatus,
  articleItemsRequest,
  articleItemsSet,
  articleRequest,
  articleRequestStatus,
  articleSet,
} from '@/store/Article/ArticleCreators'
import {EArticleActionTypes} from '@/store/Article/ArticleCreators.types'
import {IData, IResponse} from '@/store/Store.types'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {ISagaDependenciesApplication} from '@/types/application/SagaDependencies/SagaDependenciesApplication.types'
import {IArticle} from '@/types/entities/Article/ArticleEntity.types'
import {IArticleItems} from '@/types/entities/Article/ArticleItemsEntity.types'

export function* ArticleRequestSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof articleRequest>,
) {
  try {
    const {situation} = action.payload

    if (!situation) return
    const {getArticles} = new ArticleService(dependencies.httpClient)

    const queryString = `populate[image][fields][0]=url&filters[situation][$eq]=${situation}&sort[0]=createdAt%3Adesc`

    const res: THttpResponse = yield call(getArticles, queryString)

    const {data}: IResponse = res.data || {data: [] as IData[]}

    const articlesResponse: IArticle[] = data?.map(item => ({
      id: item.id,
      ...item.attributes,
      imageUrl: baseURLMain + item.attributes.image.data.attributes.url,
    }))

    yield put(articleSet(articlesResponse))
  } catch {
    yield put(
      articleRequestStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao buscar os artigos. Tente novamente',
      }),
    )
  }
}

export function* ArticleItemsGetRequestSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof articleItemsRequest>,
) {
  try {
    const {articleId} = action.payload

    if (!articleId) return

    const {getArticleItems} = new ArticleService(dependencies.httpClient)

    const queryString = `filters[articleId][id][$eq]=${articleId}&sort[0]=order%3Aasc`

    const res: THttpResponse = yield call(getArticleItems, queryString)

    const {data}: IResponse = res.data || {data: [] as IData[]}

    const articleItemsResponse: IArticleItems[] = data?.map(item => ({
      id: item.id,
      ...item.attributes,
    }))

    yield put(articleItemsSet(articleItemsResponse))
  } catch {
    yield put(
      articleItemsGetRequestStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao buscar os itens do artigo. Tente novamente',
      }),
    )
  }
}

export default function* () {
  yield takeLatest(EArticleActionTypes.ARTICLE_REQUEST, ArticleRequestSaga, {
    httpClient: new ServiceConfig(),
  })

  yield takeLatest(
    EArticleActionTypes.ARTICLE_ITEMS_REQUEST,
    ArticleItemsGetRequestSaga,
    {
      httpClient: new ServiceConfig(),
    },
  )
}
