import ApplicationStore from 'ApplicationStore'
import {createSelector} from 'reselect'

import {selectItemArrayRandom} from '@/utils/changeArray'

export const selectArticle = (state: ApplicationStore.State) => state.article

export const selectArticles = createSelector(
  [selectArticle],
  ({articles}) => articles,
)

export const selectArticleById = (articleId: number) =>
  createSelector([selectArticle], ({articles}) =>
    articles.find(article => article.id === articleId),
  )

export const selectArticlesSpotlight = createSelector(
  [selectArticle],
  ({articles}) => articles.filter(article => article.spotlight),
)

export const selectArticleRequestStatus = createSelector(
  [selectArticle],
  ({articlesGetStatus}) => articlesGetStatus,
)

export const selectArticleRandomSpotlight = createSelector(
  [selectArticlesSpotlight],
  articlesSpotlight => selectItemArrayRandom(articlesSpotlight),
)

export const selectArticleItems = createSelector(
  [selectArticle],
  ({articleItems}) => articleItems,
)

export const selectArticleItemsGetRequestStatus = createSelector(
  [selectArticle],
  ({articleItemsGetRequestStatus}) => articleItemsGetRequestStatus,
)
