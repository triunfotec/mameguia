export type TTypeTextArticleItems = 'subtitle' | 'text' | 'topic' | 'url'

export interface IArticleItems {
  id: number
  text: string
  type: TTypeTextArticleItems
  order: number
}
