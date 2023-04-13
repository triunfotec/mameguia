import {IActionStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IArticle} from '@/types/entities/Article/ArticleEntity.types'
import {IArticleItems} from '@/types/entities/Article/ArticleItemsEntity.types'

export enum EArticleActionTypes {
  ARTICLE_REQUEST = '@article/REQUEST',
  ARTICLE_REQUEST_STATUS = '@article/REQUEST_STATUS',
  ARTICLE_SET = '@article/SET',

  ARTICLE_ITEMS_REQUEST = '@article/ITEMS_REQUEST',
  ARTICLE_ITEMS_GET_REQUEST_STATUS = '@article/ITEMS_GET_REQUEST_STATUS',
  ARTICLE_ITEMS_SET = '@article/ITEMS_SET',
}
export interface IArticleState {
  readonly articles: IArticle[]
  readonly articlesGetStatus: IActionStatus

  readonly articleItems: IArticleItems[]
  readonly articleItemsGetRequestStatus: IActionStatus
}
