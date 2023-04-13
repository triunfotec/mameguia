import {Reducer} from 'redux'

import produce from 'immer'

import {
  EArticleActionTypes,
  IArticleState,
} from '@/store/Article/ArticleCreators.types'
import {resetActionStatus} from '@/store/Store.types'
import {
  EActionTypeStatus,
  IActionStatus,
} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {IArticle} from '@/types/entities/Article/ArticleEntity.types'
import {IArticleItems} from '@/types/entities/Article/ArticleItemsEntity.types'
import {TSituations} from '@/types/entities/User/UserEntity.types'

export const ARTICLE_INITIAL_STATE: IArticleState = {
  articles: [],
  articlesGetStatus: resetActionStatus,
  articleItems: [],
  articleItemsGetRequestStatus: resetActionStatus,
}

const ArticleReducer: Reducer<IArticleState> = (
  state = ARTICLE_INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case EArticleActionTypes.ARTICLE_REQUEST: {
        draft.articlesGetStatus = {
          status: EActionTypeStatus.Busy,
        }

        return draft
      }

      case EArticleActionTypes.ARTICLE_REQUEST_STATUS: {
        const {articleRequestStatus} = action.payload

        draft.articlesGetStatus = articleRequestStatus

        return draft
      }

      case EArticleActionTypes.ARTICLE_SET: {
        const {articles} = action.payload

        draft.articles = [...articles]
        draft.articlesGetStatus = {
          status: EActionTypeStatus.Success,
          message: '',
        }

        return draft
      }

      case EArticleActionTypes.ARTICLE_ITEMS_REQUEST: {
        draft.articleItemsGetRequestStatus = {
          status: EActionTypeStatus.Busy,
        }

        return draft
      }

      case EArticleActionTypes.ARTICLE_ITEMS_GET_REQUEST_STATUS: {
        const {articleItemsGetRequestStatus} = action.payload

        draft.articleItemsGetRequestStatus = articleItemsGetRequestStatus

        return draft
      }

      case EArticleActionTypes.ARTICLE_ITEMS_SET: {
        const {articleItems} = action.payload

        draft.articleItems = [...articleItems]

        draft.articleItemsGetRequestStatus = {
          status: EActionTypeStatus.Success,
          message: '',
        }

        return draft
      }
    }
  })
}

export default ArticleReducer

export const articleRequest = (situation: TSituations) => ({
  type: EArticleActionTypes.ARTICLE_REQUEST,
  payload: {situation},
})

export const articleRequestStatus = (articleRequestStatus: IActionStatus) => ({
  type: EArticleActionTypes.ARTICLE_REQUEST_STATUS,
  payload: {articleRequestStatus},
})

export const articleSet = (articles: IArticle[]) => ({
  type: EArticleActionTypes.ARTICLE_SET,
  payload: {articles},
})

export const articleItemsRequest = (articleId: number) => ({
  type: EArticleActionTypes.ARTICLE_ITEMS_REQUEST,
  payload: {articleId},
})

export const articleItemsGetRequestStatus = (
  articleItemsGetRequestStatus: IActionStatus,
) => ({
  type: EArticleActionTypes.ARTICLE_ITEMS_GET_REQUEST_STATUS,
  payload: {articleItemsGetRequestStatus},
})

export const articleItemsSet = (articleItems: IArticleItems[]) => ({
  type: EArticleActionTypes.ARTICLE_ITEMS_SET,
  payload: {articleItems},
})
